<script lang="ts">
  import Coordinates from "$lib/ui/Coordinates.svelte";
  import TreeDetails from "$lib/ui/TreeDetails.svelte";
  import type { UserTree } from "$lib/types/placemark-types";
  import { authStore } from "$lib/stores";
  import { doc, setDoc } from "firebase/firestore";
  import { db } from "$lib/firebase/firebase";
  import { treeToEdit } from "$lib/stores";

  let userTreesList = [];
  let lat = 52.160858;
  let lng = -7.15242;
  let height = 0;
  let girth = 0;
  let selectedSpecies = "";
  let selectedProvince = "Leinster";
  let publiclyAccessible = ["yes", "no"];
  let selectedAccessibility = "yes";

  authStore.subscribe((curr) => {
    userTreesList = curr.data.userTrees;
  });

  const provinceList = [{ name: "Connacht" }, { name: "Munster" }, { name: "Leinster" }, { name: "Ulster" }];

  async function updateFirestore() {
    try {
      const userRef = doc(db, "users", $authStore.user.uid);
      await setDoc(userRef, { userTrees: userTreesList }, { merge: true });
    } catch (err) {
      console.log("There was an error saving to FireStore");
    }
  }

  // Adds and saves new user tree to userTreeList
  async function addTree() {
    try {
      // Constructing a new UserTree object from UserTree type
      const newUserTree: UserTree = {
        species: selectedSpecies,
        height: height,
        girth: girth,
        province: selectedProvince,
        latitude: lat,
        longitude: lng
      };
      console.log("Adding new Tree", newUserTree);
      userTreesList = [...userTreesList, newUserTree];

      await updateFirestore();
    } catch (err) {
      console.log("Error saving tree to database");
    }
  }

  async function deleteTree(index) {
    // Creates new array excluding the indexed tree
    let newUserTreeList = [...userTreesList].filter((val, i) => {
      // Keeps all indexes except one specified
      return i != index;
    });
    userTreesList = newUserTreeList;
    await updateFirestore();
  }

  function editTree(index) {
    treeToEdit.set(userTreesList[index]);
    // Log current value of tree to edit
    const unsubscribe = treeToEdit.subscribe(value => {
      console.log("Tree to edit:", value);
    });
    unsubscribe();
  }
  
</script>

{#if !$authStore.loading}
  <form on:submit|preventDefault={addTree}>
    <div class="field">
      <TreeDetails bind:height bind:girth bind:selectedSpecies />
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
        <select bind:value={selectedProvince}>
          {#each provinceList as province}
            <option>{province.name}</option>
          {/each}
        </select>
      </div>
    </div>
    <Coordinates bind:lat bind:lng />
    <div class="field">
      <div class="control">
        <button class="button is-success is-fullwidth">Add Tree</button>
      </div>
    </div>
  </form>
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
