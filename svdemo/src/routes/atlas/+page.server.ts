import type { Actions } from "@sveltejs/kit";
import { StellarGenerator } from "../../stellarGenerator";
import {neo4jSession} from '../../db/neodb';
import type { ConstellationData } from "src/types";
import {addStarToDiscoveries} from '../../dbResolve'
import type { PageServerLoad } from "./$types";

const driver = neo4jSession();
const session = driver.session();

export const actions: Actions = {
  async find({ request }) {
    const req = await request.formData();
    const rightAscencion = req.get('ra');
    const declination = req.get('dec');
    const query = `SELECT+TOP+1+source_id,ra,dec,parallax,COALESCE(nu_eff_used_in_astrometry,pseudocolour)+AS+tmp,phot_g_mean_mag,designation+FROM+gaiadr3.gaia_source+WHERE+ra=${rightAscencion}+AND+dec=${declination}`;
    const star = (await StellarGenerator.getStarData(query))[0];
    if(star)
      return {success: true,star:star};
    return {success:false};
  },

  async discoverStar({request, locals}) {
    const res = await request.formData();
    const designatedName = res.get('designatedName') as string;
    const givenName = res.get('givenName') as string;
    const starId = res.get('starId') as string;
    await addStarToDiscoveries(locals.user.username,designatedName,givenName,starId);
  },

  async constellation({ request,locals }) {
    const req = await request.formData();
    const name = req.get('const-name');
    const constellationJSON = req.get('const-connections');
    const constellation: ConstellationData = JSON.parse(constellationJSON as string);
    constellation.name = name as string;
    constellation.discoverer =  locals.user.username;
    const test = session.run(
      `
      WITH {name: 'John', age: 30} AS map
      RETURN apoc.convert.toJson(map) AS json`)
  }
}

export const load: PageServerLoad = async ({ locals }) => {
  return {
    user: locals.user
  }
}