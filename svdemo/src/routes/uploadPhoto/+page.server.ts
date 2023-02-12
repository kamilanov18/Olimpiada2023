import { ImgurClient } from 'imgur';
import type { PageServerLoad, Action, Actions } from './$types';
import { mssqlConnection } from '../../db/mssqldb';
import { Request } from 'mssql';
import { v4 as uuidv4 } from 'uuid';
import { fail, redirect } from '@sveltejs/kit';
let username: string;

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, 'login');
	} else {
		username = locals.user.username;
	}
};
const client = new ImgurClient({
	accessToken: process.env.TOKEN,
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	refreshToken: process.env.REFRESH_TOKEN
});

async function saveURL(url: string) {
	const connection = await mssqlConnection();
	const selectRequest = new Request(connection);
	const selectResult = await selectRequest
		.input('Username', username)
		.query('SELECT Id FROM Users WHERE Username = @Username');
	const id = selectResult.recordset[0].Id;
	console.log(id);
	const insertRequest = new Request(connection);
	const insertResult = await insertRequest
		.input('Id', uuidv4())
		.input('UserId', id)
		.input('ImageURL', url)
		.query('INSERT INTO UsersImages(Id, UserId, ImageURL) VALUES(@Id, @UserId, @ImageURL)');
	return insertResult === undefined;
}

async function uploadToUmgur(file: File) {
	const buffer = Buffer.from(await file.arrayBuffer());
	const base64 = buffer.toString('base64');
	const response = await client.upload({
		image: base64,
		type: 'base64'
	});
	console.log(response.data);
	return response.data;
}

const upload: Action = async ({ request }) => {
	try {
		if (request.method === 'POST') {
			const form = await request.formData();
			const image = form.get('img') as File;
			console.log(form.get('img'));
			if (image) {
				console.log(`Received file with name: ${image.name}`);
				const link = (await uploadToUmgur(image)).link;
				console.log(link);
				if (await saveURL(link)) {
					return link;
				} else {
					fail(500, { error: true });
				}
			}
		}
	} catch (e) {
		console.log(e);
	}
};

export const actions: Actions = { upload };
