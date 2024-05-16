import { fail, redirect, type RequestEvent } from '@sveltejs/kit';

export const actions = {
  logout: async ({ cookies }: RequestEvent) => {
    try {
      // Clear the session cookie
      cookies.set('session', '', { path: '/', maxAge: 0 });
      throw redirect(303, '/');
    } catch (error) {
      console.error('Error during logout:', error);
      return fail(500, { message: 'An error occurred during logout' });
    }
  }
};