import type { Actions } from "@sveltejs/kit";
import { StellarGenerator } from "../../stellarGenerator";
import {neo4jSession} from '../../db/neodb';
import type { ConstellationData } from "src/types";

const driver = neo4jSession();
const session = driver.session();

export const actions: Actions = {
  async find({ request }) {
    console.log("vlizam")
    const req = await request.formData();
    const rightAscencion = req.get('ra');
    const declination = req.get('dec');
    const query = `SELECT+TOP+1+source_id,ra,dec,parallax,COALESCE(nu_eff_used_in_astrometry,pseudocolour)+AS+tmp,phot_g_mean_mag+FROM+gaiadr3.gaia_source+WHERE+ra=${rightAscencion}+AND+dec=${declination}`;
    const star = (await StellarGenerator.getStarData(query))[0];
    if(star)
      return {success: true,star:star};
    return {success:false};
  },

  async constellation({ request,locals }) {
    console.log('const vlizam')
    const req = await request.formData();
    const name = req.get('const-name');
    const constellationJSON = req.get('const-connections');
    const constellation: ConstellationData = JSON.parse(constellationJSON as string);
    constellation.name = name as string;
    constellation.discoverer =  locals.user.username;
    console.log(constellation);
    console.log(JSON.stringify(constellation));
    const test = session.run(
      `
      WITH {name: 'John', age: 30} AS map
      RETURN apoc.convert.toJson(map) AS json`)
    console.log((await test).records);
  }
}