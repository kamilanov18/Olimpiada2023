import type { PageLoad  } from './$types';
import type { StarData } from 'src/types';

export const load =  ( async () => {
  
  // const initialQuery = 'SELECT+TOP+10+source_id,ra,dec,parallax+FROM+gaiadr3.gaia_source+WHERE+parallax>0.1+ORDER+BY+parallax+DESC';
  const initialQuery = 'SELECT+TOP+2000+source_id,ra,dec,parallax+FROM+gaiadr3.gaia_source+WHERE+1=CONTAINS(POINT(ra,dec),BOX(90,0,20,20))+AND+parallax+BETWEEN+9+AND+10'
  const res = await fetch(`http://localhost:5173?query=${initialQuery}`,{method:'GET'});
  const stars: StarData[] = await res.json();
  return {stars};
  
}) satisfies PageLoad;


