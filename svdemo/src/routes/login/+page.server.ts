import type { Action, Actions, PageServerLoad } from './$types'
import { fail, redirect } from '@sveltejs/kit'
import { mssqlConnection } from '../../db/mssqldb';
import { Request } from 'mssql';
import {v4 as uuidv4} from 'uuid';

export const load: PageServerLoad = async ({ locals }) => {
	// redirect user if logged in
	if (locals.user) {
		throw redirect(302, '/index')
	}
}


const login: Action = async ({ cookies, request }) => {
    const connection = await mssqlConnection();
    const checkUsernameRequest = new Request(connection);
    const updateUserRequest = new Request(connection);
    const checkPasswordRequest = new Request(connection);
    const data = await request.formData()
    const username = data.get('username')
    const password = data.get('password')
  
    const checkUsernameExists = await checkUsernameRequest
		.input('Username', username)
		.query('SELECT *  FROM Users WHERE Username = @Username');
    if (checkUsernameExists.recordset.length <= 0) {

      return fail(400, { user: true });
    }
    const checkPassword = await checkPasswordRequest
    .input("Username",username)
    .input("Password",password)
    .execute("CheckPassword");

    console.log(checkPassword);
    
    const uuid=uuidv4();
    await updateUserRequest
    .input("UserAuthToken",uuid)
    .input("Username",username)
    .query("UPDATE Users SET UserAuthToken=@UserAuthToken WHERE Username=@Username")

    console.log(checkPassword.output);

    cookies.set('session', uuid, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30,
    })
  
    // redirect the user
    throw redirect(303, '/index')
  }

  
  export const actions: Actions = { login };