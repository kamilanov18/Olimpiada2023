import type { PageServerLoad  } from './$types';
 
export const load =  ( async () => {
  const res = await fetch("https://gea.esac.esa.int/tap-server/tap/sync?REQUEST=doQuery&LANG=ADQL&FORMAT=json&QUERY=SELECT+TOP+10+source_id,ra,dec,parallax+FROM+gaiadr3.gaia_source", {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  });
  const stars = await res.json();
  return {
    stars
  };
}) satisfies PageServerLoad ;