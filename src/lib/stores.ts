// place files you want to import through the `$lib` alias in this folder.
// Values that can be changed from anywhere in an application, and updated dynamically on any UX they are embedded in

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { writable } from "svelte/store";
import { auth } from "./firebase/firebase";

// Subtitle to be used on a window
export const subTitle = writable<string>();

export const authStore = writable({
    user: null,
    loading: true,
    data: {}
  });
  
  export const authHandlers = {
    signup: async (username: string, email: string, password: string) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Add username if successfully created user
        await updateProfile(userCredential.user, { displayName: username });
    },
    login: async (email: string, password: string) => {
      await signInWithEmailAndPassword(auth, email, password);
    },
    logout: async () => {
      await signOut(auth);
    }
  };