// Handles user session authentication and gets user data on server side rendering

import { db, auth } from '$lib/firebase/server-firebase-admin';
import type { RequestEvent } from './contributorGuide/$types';

export async function load({ cookies }: RequestEvent) {
    // Gets session cookie (if it exists)
    const sessionCookie = cookies.get('session');
  
    // If session cookie exists, verify it and get user data
    if (sessionCookie) {
      try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true); //Verify userId and store decoded version
        const userId = decodedClaims.uid;
        const userDoc = await db.collection('users').doc(userId).get(); //Use user id to get user database
        const userData = userDoc.data();
  
        return { // Return current user and user data to be used client side
          props: {
            user: userData,
            userTrees: userData.userTrees || [],
          },
        };
        // If the session cookie is invalid
      } catch (error) {
        console.error('Failed to verify session cookie:', error);
        // Clear the invalid session cookie
        cookies.set('session', '', { path: '/', maxAge: 0 });
      }
    }
  
    // If no session cookie, return null user data
    return {
      props: {
        user: null,
        userTrees: [],
      },
    };
  }