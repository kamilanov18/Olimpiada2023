import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { mssqlConnection } from '../../db/mssqldb';
import {  Request } from 'mssql';






export const POST = (async ({ request }) => {
	
	const connection = await mssqlConnection();
	const requestDB = new Request(connection);
	const checkUsernameRequest=new Request(connection);
	const checkEmailRequest=new Request(connection);

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


	console.log(checkUsernameExists.recordset.length)
	console.log(checkEmailExists.recordset.length)
  if (checkUsernameExists.recordset.length > 0) {
    return json({ error: 'Username or Email already exists' });
  }

  if (checkEmailExists.recordset.length > 0) {
    return json({ error: 'Username or Email already exists' });
  }
try{
	const result = await requestDB
		.input("Username", username)
		.input("Email", email)
		.input("Password", pass)
		.input("FirstName", fname)
		.input("LastName", lname)
		.execute("InsertUser");

	console.log("result from query: ")
	console.log(result);
	console.log(email);
	console.log(username);
	console.log(pass);
	console.log(fname);
	console.log(lname);
}catch(err){
	console.error(err);
	return json("an error occured");
}
finally{
	connection.close();
}
	

	return json([email, username, pass, fname, lname]);
}) satisfies RequestHandler;
