// place files you want to import through the `$lib` alias in this folder.

// Values that can be changed from anywhere in an application, and updated dynamically on any UX they are embedded in
import { writable } from "svelte/store";

// Subtitle to be used on a window
export const subTitle = writable<string>();
// Email of currently logged in user
export const currentSession = writable<string>();