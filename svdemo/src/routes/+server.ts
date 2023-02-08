import { json } from "@sveltejs/kit";
import type { Position } from "@threlte/core";
import type { StarData } from "src/types";
import type { RequestHandler } from "./$types";
import chroma from "chroma-js";

function get3DCoordinates(rightAscension: number,declination: number,parallax: number): Position/*[number,number,number]*/ {
  const theta = (90 - declination) * Math.PI / 180;
  const phi = rightAscension * Math.PI / 180;
  const d = (1 / (parallax/1000));
  // const d = (1 / (parallax));
  const r = d;

  const x = r * Math.sin(theta) * Math.cos(phi);
  const z = r * Math.sin(theta) * Math.sin(phi);
  const y = r * Math.cos(theta);

  return {x,y,z};
}

function clamp(min:number,max:number,number:number):number{
    if(number>max)
      return max;
    if(number<min)
      return min;
    return number;
}

function calculateColor(wavenumber:number|null):string {
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

  const colorScale = chroma.scale(['blue', 'yellow', 'red']).mode('lch');

// Map BP-RP values to RGB colors
  const color = colorScale(wavenumber as number / 3).hex();
  console.log(color);

  return color;
}

async function getStarData(query:string): Promise<StarData[]> {
  const res = await fetch(`https://gea.esac.esa.int/tap-server/tap/sync?REQUEST=doQuery&LANG=ADQL&FORMAT=json&QUERY=${query}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  });
  console.log(res.status);
  const json = await res.json();
  const stars: StarData[] = [];
  
  json.data.forEach((info:number[]) => {
    const star:StarData = {id:0,rightAscencion:0,declination:0,parallax:0,pseudocolor:'',mag:0,coordinates:{x:0,y:0,z:0}};

    star.id=info[0];
    star.rightAscencion=info[1];
    star.declination=info[2];
    star.parallax=info[3];
    star.pseudocolor=calculateColor(info[4]);
    star.mag=info[5];
    
    star.coordinates=get3DCoordinates(star.rightAscencion,star.declination,star.parallax);

    stars.push(star);
  });

  return stars;
}

export const GET = ( async({ url }) => {
    const query = url.searchParams.get('query') as string;
    const stars = await getStarData(query);
    return json(stars);

}) satisfies RequestHandler;