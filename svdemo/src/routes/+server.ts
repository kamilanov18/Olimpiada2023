import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { StellarGenerator } from "../stellarGenerator";
import * as dotenv from "dotenv";
dotenv.config();

export const GET = ( async({ url }) => {
    const isInitial = url.searchParams.get('isInitial') as string;
    console.log(isInitial);
    if(isInitial==='true')
    {
      const stars = await StellarGenerator.getStarData('SELECT+TOP+2000+source_id,ra,dec,parallax,COALESCE(nu_eff_used_in_astrometry,pseudocolour)+AS+tmp,phot_g_mean_mag+FROM+gaiadr3.gaia_source+WHERE+parallax>0.1+ORDER+BY+parallax+DESC');
      return json(stars);
    }
    const rightAscencion = Number(url.searchParams.get('ra') as string);
    const declination = Number(url.searchParams.get('dec') as string);
    const parallax = Number(url.searchParams.get('p') as string);
    const query = StellarGenerator.determineStarRenderDistanceQuery(rightAscencion,declination,parallax);

    const stars = await StellarGenerator.getStarData(query);
    return json(stars);

}) satisfies RequestHandler;
