import { json } from '@sveltejs/kit';
import { mssqlConnection } from '../../db/mssqldb';
import { Request } from 'mssql';
import type { Action, Actions,PageServerLoad  } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';





const register: Action = async ({ request }) => {
	const connection = await mssqlConnection();
	const requestDB = new Request(connection);
	const checkUsernameRequest = new Request(connection);
	const checkEmailRequest = new Request(connection);

	const req = await request.formData();

	const username = req.get('username');
	const email = req.get('email');
	const pass = req.get('password');
	const fname = req.get('firstName');
	const lname = req.get('lastName');

	const checkUsernameExists = await checkUsernameRequest
		.input('Username', username)
		.query('SELECT *  FROM Users WHERE Username = @Username');

	const checkEmailExists = await checkEmailRequest
		.input('Email', email)
		.query('SELECT * FROM Users WHERE Email = @Email');

	console.log(checkUsernameExists.recordset.length);
	console.log(checkEmailExists.recordset.length);
	if (checkUsernameExists.recordset.length > 0) {
		return fail(400, { user: true });
	}

	if (checkEmailExists.recordset.length > 0) {
		return fail(400, { user: true });
	}
	try {
		const result = await requestDB
			.input('Username', username)
			.input('Email', email)
			.input('Password', pass)
			.input('FirstName', fname)
			.input('LastName', lname)
			.execute('InsertUser');

		console.log('result from query: ');
		console.log(result);
		console.log(email);
		console.log(username);
		console.log(pass);
		console.log(fname);
		console.log(lname);
	} catch (err) {
		console.error(err);
		return json('an error occured');
	} finally {
		connection.close();
	}

	return fail(303, { user: false });
};



export const actions: Actions = { register };




