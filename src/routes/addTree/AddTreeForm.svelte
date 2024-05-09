<script lang="ts">
  import Coordinates from "$lib/ui/Coordinates.svelte";
  import TreeDetails from "$lib/ui/TreeDetails.svelte";
  import type { UserTree } from "$lib/types/placemark-types";
  import { authStore } from "$lib/stores";
  import { doc, setDoc } from "firebase/firestore";
  import { db } from "$lib/firebase/firebase";
  import { goto } from "$app/navigation";

  let userTreesList: UserTree[] = [];
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
      console.log("New tree added", newUserTree);
      userTreesList.push(newUserTree); // Adding to userTreesList

      // Adding to current user's Firebase database using user id
      const userRef = doc(db, "users", $authStore.user.uid);
      // Appending new user tree
      await setDoc(userRef, { userTrees: userTreesList }, { merge: true });
      goto("/report");
    } catch (err) {
      console.log("Error saving tree to database");
    }
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
{/if}
