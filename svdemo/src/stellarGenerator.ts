import type { Position } from "@threlte/core";
import type { StarData } from "./types";
import chroma from "chroma-js";

class StellarGenerator {
    static get3DCoordinates = function(rightAscension: number,declination: number,parallax: number): Position {
        const theta = (90 - declination) * Math.PI / 180;
        const phi = rightAscension * Math.PI / 180;
        const d = (1 / (parallax/1000));
        const r = d;
      
        const x = r * Math.sin(theta) * Math.cos(phi);
        const z = r * Math.sin(theta) * Math.sin(phi);
        const y = r * Math.cos(theta);
      
        return {x,y,z};
    }
      
    static clamp = function(min:number,max:number,number:number):number{
          if(number>max)
            return max;
          if(number<min)
            return min;
          return number;
    }
      
    static calculateColor = function(wavenumber:number|null):string {
        // if(wavenumber===null) return 'rgb(1,1,1)';

        // let wavelength = 1 / wavenumber;
        // wavelength=Math.round(wavelength*1000);
        // wavelength = clamp(380,780,wavelength);
      
        // console.log("wl: "+wavelength);
      
        // const IntensityMax = 255, Gamma=0.8;
        // let factor, red, green, blue;
        // if((wavelength >= 380) && (wavelength<440)){
        //   red = -(wavelength - 440) / (440 - 380);
        //   green = 0.0;
        //   blue = 1.0;
        // }else if((wavelength >= 440) && (wavelength<490)){
        //   red = 0.0;
        //   green = (wavelength - 440) / (490 - 440);
        //   blue = 1.0;
        // }else if((wavelength >= 490) && (wavelength<510)){
        //   red = 0.0;
        //   green = 1.0;
        //   blue = -(wavelength - 510) / (510 - 490);
        // }else if((wavelength >= 510) && (wavelength<580)){
        //   red = (wavelength - 510) / (580 - 510);
        //   green = 1.0;
        //   blue = 0.0;
        // }else if((wavelength >= 580) && (wavelength<645)){
        //   red = 1.0;
        //   green = -(wavelength - 645) / (645 - 580);
        //   blue = 0.0;
        // }else if((wavelength >= 645) && (wavelength<781)){
        //   red = 1.0;
        //   green = 0.0;
        //   blue = 0.0;
        // }else{
        //   red = 0.0;
        //   green = 0.0;
        //   blue = 0.0;
        // };
        // // Let the intensity fall off near the vision limits
        // if((wavelength >= 380) && (wavelength<420))
        //   factor = 0.3 + 0.7*(wavelength - 380) / (420 - 380);
        // else if((wavelength >= 420) && (wavelength<701))
        //   factor = 1.0;
        // else if((wavelength >= 701) && (wavelength<781))
        //   factor = 0.3 + 0.7*(780 - wavelength) / (780 - 700);
        // else
        //   factor = 0.0;
        // if (red !== 0)
        //   red = Math.round(IntensityMax * Math.pow(red * factor, Gamma));
        // if (green !== 0)
        //   green = Math.round(IntensityMax * Math.pow(green * factor, Gamma));
        // if (blue !== 0)
        //   blue = Math.round(IntensityMax * Math.pow(blue * factor, Gamma));
        
        // console.log(wavelength);
      
        //const colorScale = chroma.scale(['blue', 'yellow', 'red']).mode('lch');
      
      // Map BP-RP values to RGB colors
        //const color = colorScale(wavenumber as number / 3).hex();
        let color;
        if(wavenumber)
          color = chroma.temperature(wavenumber as number).hex();
        else color = '#00ff00';
        // console.log(wavenumber);
        // console.log(color);
      
        return color;
      }
      
    static getStarData = async function (query:string): Promise<StarData[]> {
        const urlReq = await fetch(`https://gea.esac.esa.int/tap-server/tap/async?USERNAME=${process.env.GAIA_ARCHIVE_USERNAME}&PASSWORD=${process.env.GAIA_ARCHIVE_PASSWORD}&PHASE=run&REQUEST=doQuery&LANG=ADQL&FORMAT=json&QUERY=${query}`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          }
        });
        console.log(urlReq.url);
        let res = new Response(), isRequestComplete;
        while(!isRequestComplete) {
          res = await fetch(urlReq.url+"/phase", {
            method: 'GET'
          });
          if((await res.text())==="COMPLETED")
            isRequestComplete=true;
        }
        res = await fetch(urlReq.url+"/results/result", {
          method: 'GET',
          headers: {
            'content-type': 'application/json'
          }
        });
        
        const json = await res.json();
        const stars: StarData[] = [];
        
        json.data.forEach((info:number[]) => {
          const star:StarData = {id:0,rightAscencion:0,declination:0,parallax:0,pseudocolor:'',mag:0,coordinates:{x:0,y:0,z:0}};
      
          star.id=info[0];
          star.rightAscencion=info[1];
          star.declination=info[2];
          star.parallax=info[3];
          star.pseudocolor=StellarGenerator.calculateColor(info[4]);
          star.mag=info[5];
          
          star.coordinates=StellarGenerator.get3DCoordinates(star.rightAscencion,star.declination,star.parallax);
      
          stars.push(star);
        });
      
        return stars;
      }
      
    static determineStarRenderDistanceQuery = function(rightAscencion:number, declination:number, parallax:number) {
        let query; 
        const sizeCoefficient=1.5;
        let parallaxLowerArc = parallax/(1-(sizeCoefficient/100)*parallax);
        const parallaxHigherArc = parallax/(1+(sizeCoefficient/100)*parallax);
        const factor = parallaxHigherArc/parallaxLowerArc;
        let figureDegrees = sizeCoefficient*parallax*factor;      
              
        if(figureDegrees>90) figureDegrees=90;
      
        else if(parallax>20)
        {
          figureDegrees=30;
          parallaxLowerArc=767;
        }
        else if(parallaxLowerArc<0)
        {
          parallaxLowerArc=767;
          figureDegrees=70;
        }
              
        if(parallax>110)
          query = 'SELECT+TOP+1000+source_id,ra,dec,parallax,teff_gspphot_upper,phot_g_mean_mag+FROM+gaiadr3.gaia_source+WHERE+parallax>0.1+ORDER+BY+parallax+DESC';
        else
          query = `SELECT+source_id,ra,dec,parallax,teff_gspphot_upper,phot_g_mean_mag+FROM+gaiadr3.gaia_source+WHERE+1=CONTAINS(POINT(ra,dec),CIRCLE(${rightAscencion},${declination},${figureDegrees}))+AND+parallax+BETWEEN+${parallaxHigherArc}+AND+${parallaxLowerArc}`;
        return query;
    }
}

export {StellarGenerator};