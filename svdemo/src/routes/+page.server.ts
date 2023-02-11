import type {   Action, Actions } from "@sveltejs/kit";

const find: Action = async ({ request }) => {
    console.log('aaa');
    const req = await request.formData();
    const rightAscencion = req.get('ra');
    const declination = req.get('dec');
    
  }
  
  export const actions: Actions = {find};