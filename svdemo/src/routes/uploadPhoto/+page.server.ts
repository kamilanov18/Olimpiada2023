import { redirect } from '@sveltejs/kit';
import { ImgurClient } from 'imgur';
import type { PageServerLoad, Action, Actions } from './$types';
export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, 'login');
	}
};
const client = new ImgurClient({
	accessToken: process.env.TOKEN,
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	refreshToken: process.env.REFRESH_TOKEN
});

async function uploadToUmgur(file: File) {
    const buffer = Buffer.from(await file.arrayBuffer());
const base64 = buffer.toString('base64');
	const response = await client.upload({
		image:  base64,
		type: 'base64'
	});
	console.log(response.data);
	return response.data;
}

const upload: Action = async ({ request }) => {
    try
    {
        if (request.method === 'POST') {
		const form = await request.formData();
		const image = form.get('img') as File;
		console.log(form.get('img'));
		if (image) {
			console.log(`Received file with name: ${image.name}`);

			return await uploadToUmgur(image);
		}
	}
    }catch(e){
        console.log(e);
    }
	
};



export const actions: Actions = { upload };
