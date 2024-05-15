// place files you want to import through the `$lib` alias in this folder.
// Values that can be changed from anywhere in an application, and updated dynamically on any UX they are embedded in

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { writable } from "svelte/store";
import { auth } from "./firebase/firebase";
import type { UserTree } from "./types/placemark-types";

// Subtitle to be used on a window
export const subTitle = writable<string>();

export const authStore = writable({
  user: {} || null,
  loading: true,
  data: {}
});

// Could be used for live updates on charts, maps
export const userTreesStore = writable<UserTree[]>([]);

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

// Keeps userTree details to edit
export const treeToEdit = writable<UserTree>();

// Boolean if in editing mode or add tree mode
export const editingMode = writable<boolean>();
