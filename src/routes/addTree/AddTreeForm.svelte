<script lang="ts">
  import Coordinates from "$lib/ui/Coordinates.svelte";
  import TreeDetails from "$lib/ui/TreeDetails.svelte";
  import type { UserTree } from "$lib/types/placemark-types";
  import { authStore, treeToEdit, editingMode, userTreesStore } from "$lib/stores";
  import { doc, setDoc } from "firebase/firestore";
  import { db } from "$lib/firebase/firebase";
  import { onDestroy, onMount } from "svelte";

  let latitude = 52.160858;
  let longitude = -7.15242;
  let height = 0;
  let girth = 0;
  let species = "";
  let province = "Leinster";
  let publiclyAccessible = ["yes", "no"];
  let selectedAccessibility = "yes";

  let userTreesList: UserTree[] = [];

  // Will re-use form for editing as well as adding trees
  // Set editingMode to false when the component mounts
  onMount(() => {
    editingMode.set(false);
  });

  // Subscribe to userTreesStore
  const unsubscribe = userTreesStore.subscribe((trees: UserTree[]) => {
    userTreesList = trees;
  });

  // Unsubcribe from userTreesStore when unmounting page
  onDestroy(() => {
    unsubscribe();
  });

  const provinceList = [{ name: "Connacht" }, { name: "Munster" }, { name: "Leinster" }, { name: "Ulster" }];

  async function updateFirestore() {
    try {
      userTreesStore.set(userTreesList); //Update userTreesStore whenever changes made to userTreesList
      const userRef = doc(db, "users", $authStore.user.uid);
      await setDoc(userRef, { userTrees: userTreesList }, { merge: true });
    } catch (err) {
      console.log("There was an error saving to FireStore");
    }
  }

  // Adds and saves new user tree to userTreeList
  export async function addTree() {
    editingMode.set(false);
    try {
      // Constructing a new UserTree object from UserTree type
      const newUserTree: UserTree = {
        species: species,
        height: height,
        girth: girth,
        province: province,
        latitude: latitude,
        longitude: longitude
      };
      console.log("Adding new Tree", newUserTree);
      userTreesList = [...userTreesList, newUserTree];

      await updateFirestore();
    } catch (err) {
      console.log("Error saving tree to database");
    }
  }

  async function deleteTree(index: number) {
    // Creates new array excluding the indexed tree
    let newUserTreeList = [...userTreesList].filter((val, i) => {
      // Keeps all indexes except one specified
      return i != index;
    });
    userTreesList = newUserTreeList;
    await updateFirestore();
  }

  async function editTree(index: number) {
    editingMode.set(true);
    treeToEdit.set(userTreesList[index]);
    const unsubscribe = treeToEdit.subscribe((value) => {
      if (value) {
        species = value.species;
        height = value.height;
        girth = value.girth;
        province = value.province;
        longitude = value.longitude ?? 0.0;
        latitude = value.latitude ?? 0.0;
      } else {
        console.log("No values updated");
      }
    });
    unsubscribe();
    // Delete selected tree, will use addTree to update it
    deleteTree(index);
  }
</script>

{#if !$authStore.loading}
  <form on:submit|preventDefault={addTree}>
    <div class="field">
      <TreeDetails bind:height bind:girth bind:species />
    </div>
    <div class="field">
      <div class="control">
        <label class="label" for="publiclyAccessible">Publicly Accessible:</label>
        {#each publiclyAccessible as accessibility}
          <input bind:group={selectedAccessibility} class="radio" type="radio" value={accessibility} /> {accessibility}
        {/each}
      </div>
    </div>
    <div class="field">
      <label class="label" for="province">Select province:</label>
      <div class="select">
        <select bind:value={province}>
          {#each provinceList as province}
            <option>{province.name}</option>
          {/each}
        </select>
      </div>
    </div>
    <Coordinates bind:latitude bind:longitude />
    <div class="field">
      <div class="control">
        <button class="button is-success is-fullwidth">Submit</button>
      </div>
    </div>
  </form>
  {#if !$editingMode}
    <table class="table is-fullwidth">
      <thead>
        <th>Species</th>
        <th>Height</th>
        <th>Girth</th>
        <th>Province</th>
        <th>Contributor</th>
        <th>Actions</th>
      </thead>
      <tbody>
        {#each userTreesList as tree, index}
          <tr>
            <td>
              {tree.species}
            </td>
            <td>
              {tree.height}
            </td>
            <td>
              {tree.girth}
            </td>
            <td>
              {tree.province}
            </td>
            <td> username? </td>
            <td>
              <button on:click={() => editTree(index)}> <i class="far fa-edit"> </i></button>
              <button on:click={() => deleteTree(index)}> <i class="fas fa-trash-alt"></i> </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
{/if}
