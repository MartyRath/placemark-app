// These functions allow users to add, edit and delete their trees

import { editingMode, treeToEdit } from "$lib/stores";
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

  export async function deleteTree(index: number, userTreesList: UserTree[]): Promise<UserTree[]> {
    try {
      // Makes a new array from userTreesList except that tree at the current userTreeList index.
      const newUserTreeList = [...userTreesList].filter((_, i) => i !== index); // Excludes tree at input index
      return newUserTreeList;
    } catch (err) {
      console.log("Error deleting tree");
      return userTreesList;
    }
  }
  
  export async function editTree(index: number, userTreesList: UserTree[]) {
    // Reuses addTree form to edit
    editingMode.set(true);
    // Sets treeToEdit store to new input form values
    treeToEdit.set(userTreesList[index]);
  }
