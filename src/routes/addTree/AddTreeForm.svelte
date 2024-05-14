<script lang="ts">
  import Coordinates from "$lib/ui/Coordinates.svelte";
  import TreeDetails from "$lib/ui/TreeDetails.svelte";
  import type { UserTree } from "$lib/types/placemark-types";
  import { authStore, treeToEdit, editingMode, userTreesStore } from "$lib/stores";
  import { doc, setDoc } from "firebase/firestore";
  import { db } from "$lib/firebase/firebase";
  import { onDestroy, onMount } from "svelte";
  import { addTree, deleteTree, editTree } from "$lib/services/crud-utils";

  let latitude = 52.160858;
  let longitude = -7.15242;
  let height = 0;
  let girth = 0;
  let species = "";
  let province = "Leinster";
  let publiclyAccessible = ["yes", "no"];
  let selectedAccessibility = "yes";
  const provinceList = [{ name: "Connacht" }, { name: "Munster" }, { name: "Leinster" }, { name: "Ulster" }];
  let userTreesList: UserTree[] = [];

  onMount(() => {
    editingMode.set(false); // Set editingMode to false when the component mounts
  });

  const unsubscribe = userTreesStore.subscribe((trees: UserTree[]) => { // Subscribe to userTreesStore
    userTreesList = trees;
  });

  onDestroy(() => {
    unsubscribe(); // Unsubcribe from userTreesStore when unmounting page
  });

  // Updates Firestore with userTreesList
  async function updateFirestore() {
    try {
      userTreesStore.set(userTreesList); //Update userTreesStore whenever changes made to userTreesList
      const userRef = doc(db, "users", $authStore.user.uid);
      await setDoc(userRef, { userTrees: userTreesList }, { merge: true });
    } catch (err) {
      console.log("There was an error saving to FireStore");
    }
  }

 // Adds user tree
 async function handleAddTree() {
  const newUserTree: UserTree = { species, height, girth, province, latitude, longitude };
  userTreesList = await addTree(newUserTree, userTreesList);
  await updateFirestore();
 }

 // Deletes a user tree
 async function handleDelete(index: number) {
    userTreesList = await deleteTree(index, userTreesList);
    await updateFirestore();
  }

  // Edits a user tree
  async function handleEdit(index: number) {
    editTree(index, userTreesList);
    userTreesList = await deleteTree(index, userTreesList); // Deleting previous tree
  }
</script>

{#if !$authStore.loading}
  <form on:submit|preventDefault={handleAddTree}>
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
              <button on:click={() => handleEdit(index)}> <i class="far fa-edit"> </i></button>
              <button on:click={() => handleDelete(index)}> <i class="fas fa-trash-alt"></i> </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
{/if}
