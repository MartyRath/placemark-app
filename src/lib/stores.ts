// place files you want to import through the `$lib` alias in this folder.
// Values that can be changed from anywhere in an application, and updated dynamically on any UX they are embedded in

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { writable } from "svelte/store";
import { auth } from "./firebase/firebase";

// Subtitle to be used on a window
export const subTitle = writable<string>();
