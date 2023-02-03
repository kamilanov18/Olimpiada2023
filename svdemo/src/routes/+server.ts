import { json } from "@sveltejs/kit";
import type { Position } from "@threlte/core";
import type { StarData } from "src/types";
import type { RequestHandler } from "./$types";

function degToRad(degrees: number):number {
    return degrees*Math.PI/180;
}

function get3DCoordinates(rightAscension: number,declination: number,parallax: number): Position/*[number,number,number]*/ {
  const distance:number = ((1/parallax))*3.26;
  const ra = degToRad(rightAscension);
  const dec = degToRad(declination);
  const x = distance* Math.cos(dec)*Math.cos(ra);
  const y = distance*Math.cos(dec)*Math.sin(ra);
  const z = distance*Math.sin(dec);
  return {x,y,z};
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
    const star:StarData = {id:0,rightAscencion:0,declination:0,parallax:0,coordinates:{x:0,y:0,z:0}};

    star.id=info[0];
    star.rightAscencion=info[1];
    star.declination=info[2];
    star.parallax=info[3]
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