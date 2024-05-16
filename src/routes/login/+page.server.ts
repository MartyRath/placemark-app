import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/firebase/server-firebase-admin';

export const actions = {
  login: async ({ request, cookies }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      return fail(400, { email, password, message: 'Please provide email and password' });
    }

    try {
        // Creates session cookie for authenticated user
      const userRecord = await auth.createSessionCookie(email, {
        expiresIn: 60 * 60 * 24 * 7 * 1000, // 1 week in milliseconds
      });

      cookies.set('session', userRecord, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // Cookie expires in 1 week
      });

      throw redirect(303, '/addTree');
    } catch (error) {
      console.error('Authentication error:', error);
      return fail(500, { email, password, message: 'An error occurred during authentication' });
    }
  }
};