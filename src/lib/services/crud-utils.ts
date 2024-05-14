// Add crud functions here

import { editingMode } from "$lib/stores";
import type { UserTree } from "$lib/types/placemark-types";

export async function addTree(newUserTree: UserTree, userTreesList: UserTree[]) {
    editingMode.set(false);
    try {
      console.log("Adding new Tree", newUserTree);
      const newUserTreesList = [...userTreesList, newUserTree];
      return newUserTreesList;
    } catch (err) {
      console.log("Error saving tree to database");
      return userTreesList;
    }
  }