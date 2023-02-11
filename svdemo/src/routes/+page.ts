import type { PageLoad  } from './$types';
import type { ConstellationData, StarData } from 'src/types';

export const load =  ( async () => {
  const res = await fetch(`http://localhost:5173?isInitial=true`,{method:'GET'});
  const stars: StarData[] = await res.json();
  const constellations: ConstellationData[] = [
    {
      name:'test',
      discoverer:'test',
      connections: [{startingStar:stars[0],endingStar:stars[1]}]
    }
  ]
  return {stars,constellations};
  
}) satisfies PageLoad;