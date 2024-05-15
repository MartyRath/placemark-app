<script lang="ts">
  import Coordinates from "$lib/ui/Coordinates.svelte";
  import TreeDetails from "$lib/ui/TreeDetails.svelte";
  import type { UserTree } from "$lib/types/placemark-types";
  import { authStore, treeToEdit, editingMode, userTreesStore } from "$lib/stores";
  import { doc, setDoc } from "firebase/firestore";
  import { db, storage } from "$lib/firebase/firebase";
  import { onDestroy, onMount } from "svelte";
  import { addTree, deleteTree, editTree } from "$lib/services/crud-utils";
  import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

  let latitude = 52.160858;
  let longitude = -7.15242;
  let height = 0;
  let girth = 0;
  let species = "";
  let province = "Leinster";
  let accessibility = "yes";
  
  const publiclyAccessible = ["yes", "no"]; // Options for accessibility
  const provinceList = [{ name: "Connacht" }, { name: "Munster" }, { name: "Leinster" }, { name: "Ulster" }];
  let userTreesList: UserTree[] = [];

  let uploadedImageUrls: string[] = [];
  let uploadingFiles = false;
  let uploadCount = 0;
  let imagesToDelete: string[] = [];

  onMount(() => {
    editingMode.set(false); // Set editingMode to false when the component mounts
  });

  const unsubscribe = userTreesStore.subscribe((trees: UserTree[]) => {
    // Subscribe to userTreesStore
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

  // Adds user tree from input form details
  async function handleAddTree() {
    const newUserTree: UserTree = { species, height, girth, province, latitude, longitude, accessibility, images: uploadedImageUrls };
    userTreesList = await addTree(newUserTree, userTreesList);
    await updateFirestore();

    // Delete images from Firebase Storage during add tree
    for (const imageUrl of imagesToDelete) {
      const imageRef = ref(storage, imageUrl); // Creates reference to identify images to delete
      try {
        await deleteObject(imageRef);
        uploadedImageUrls = ["Item deleted"];
      } catch (error) {
        console.error("Error deleting image from Firebase Storage:", error);
      }
    }

    // Reset the input fields after tree added
    latitude = 52.160858;
    longitude = -7.15242;
    height = 0;
    girth = 0;
    species = "";
    province = "Leinster";
    accessibility = "yes";
    uploadedImageUrls = [];
    imagesToDelete = [];
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

  // Handles image files uploaded from users. Event triggered on change of input i.e. images added
  function handleFileUpload(event: Event) {
    // gets the file list from the input element
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      uploadingFiles = true; // Indicating upload in progress
      uploadCount += files.length; // How many files to upload

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        uploadImage(file) // Starts the file upload, returns download url of image
          // Updates uploadedImageUrls with download URL when file uploaded. Allows loop to restart immediately
          .then((imageURL) => {
            uploadedImageUrls = [...uploadedImageUrls, imageURL]; // Updates uploadedImageUrls
            uploadCount--; // Upload complete, 1 less to upload
            if (uploadCount === 0) {
              uploadingFiles = false; // All uploads complete
            }
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
            uploadingFiles = false;
          });
      }
    }
  }

  // Uploads images to Firebase storage default bucket
  async function uploadImage(file: File): Promise<string> {
    const storageRef = ref(storage, `images/${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  }

  // Removes image download url from user's tree
  function handleDeleteImage(imageUrl: string) {
    imagesToDelete = [...imagesToDelete, imageUrl]; // Add the image URL to the imagesToDelete array
    uploadedImageUrls = uploadedImageUrls.filter((url) => url !== imageUrl); // Remove the image URL from uploadedImageUrls
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
        {#each publiclyAccessible as option}
          <input bind:group={accessibility} class="radio" type="radio" value={option} /> 
          {option}
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

      <div class="field">
        <label class="label" for="uploadedImageUrls">Upload Images:</label>
        <input type="file" id="uploadedImageUrls" accept="image/*" multiple on:change={(event) => handleFileUpload(event) } />
      </div>

      {#if uploadedImageUrls.length > 0}
        {#each uploadedImageUrls as imageURL}
          <img src={imageURL} alt="images uploaded" height="200" width="200" />
          <button on:click={() => handleDeleteImage(imageURL)}>Delete</button>
        {/each}
      {/if}
    </div>
    <Coordinates bind:latitude bind:longitude />
    <div class="field">
      <div class="control">
        {#if uploadingFiles}
          <button class="button is-success is-fullwidth" disabled>Images uploading </button>
        {:else}
          <button class="button is-success is-fullwidth">Submit </button>
        {/if}
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
        <th>Accessibility</th>
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
            <td> 
              {tree.accessibility} 
            </td>
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
