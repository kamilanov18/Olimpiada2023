import type {   Action, Actions } from "@sveltejs/kit";
import { StellarGenerator } from "../stellarGenerator";

const find: Action = async ({ request }) => {
  console.log('aaa');
  const req = await request.formData();
  const rightAscencion = req.get('ra');
  const declination = req.get('dec');
  const query = `SELECT+TOP+1+source_id,ra,dec,parallax,COALESCE(nu_eff_used_in_astrometry,pseudocolour)+AS+tmp,phot_g_mean_mag+FROM+gaiadr3.gaia_source+WHERE+ra=${rightAscencion}+AND+dec=${declination}`;
  const star = (await StellarGenerator.getStarData(query))[0];
  console.log("star: "+star);
  if(star)
    return {success: true,star:star};
  return {success:false};
}
  
export const actions: Actions = {find};