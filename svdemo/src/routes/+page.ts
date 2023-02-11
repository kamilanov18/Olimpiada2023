import type { PageLoad  } from './$types';
import type { StarData } from 'src/types';

export const load =  ( async () => {
  const res = await fetch(`http://localhost:5173?isInitial=true`,{method:'GET'});
  const stars: StarData[] = await res.json();
  return {stars};
  
}) satisfies PageLoad;