<script lang="ts">
  import Coordinates from "$lib/ui/Coordinates.svelte";
  import TreeDetails from "$lib/ui/TreeDetails.svelte";
  import type { UserTree } from "$lib/types/placemark-types";
  import { authStore, editingMode, treeToEdit, userTreesStore } from "$lib/stores";
  import { doc, setDoc } from "firebase/firestore";
  import { db, storage } from "$lib/firebase/firebase";
  import { onDestroy, onMount } from "svelte";
  import { addTree, deleteTree, editTree } from "$lib/services/crud-utils";
  import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
  import ImagePreview from "$lib/ui/ImagePreview.svelte";
  import Message from "$lib/ui/Message.svelte";
  import { areCoordinateWithinIreland } from "$lib/services/coordinates-utils";

  // Variables and options for the form input fields
  let latitude = 52.160858;
  let longitude = -7.15242;
  let height = 0;
  let girth = 0;
  let species = "";
  let province = "Leinster";
  let accessibility = "yes";
  let message = "";
  // Variables for image download URLS, upload state, upload count, and array to hold images to delete
  let uploadedImageUrls: string[] = [];
  let uploadingFiles = false;
  let uploadCount = 0;
  let imagesToDelete: string[] = [];

  let userTreesList: UserTree[] = []; // This will hold all user trees

  onMount(() => {
    editingMode.set(false); // Set editingMode to false when the component mounts
  });

  const unsubscribe = userTreesStore.subscribe((trees: UserTree[]) => {
    userTreesList = trees; // Subscribe to userTreesStore
  });

  // Subscribe to treeToEdit store to update input field when in editMode
  const unsubscribeTreeToEdit = treeToEdit.subscribe((tree) => {
    // Update input fields when in editing mode
    height = tree?.height || 0.0;
    girth = tree?.girth || 0.0;
    species = tree?.species || "Douglas fir";
    accessibility = tree?.accessibility || "yes";
    province = tree?.province || "Leinster";
    latitude = tree?.latitude || 0.0;
    longitude = tree?.longitude || 0.0;
    uploadedImageUrls = tree?.images || [];
  });

  onDestroy(() => {
    unsubscribe(); // Unsubcribe from userTreesStore when unmounting page
    unsubscribeTreeToEdit();
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

  // Adds user tree from input form details. Supports image deletion during addTree process
  async function handleAddTree() {
    // Check if any required field is missing
    if (!species || !height || !girth || !province || !latitude || !longitude || !accessibility) {
      message = "Please fill in all required fields.";
      return;
    }

    // Checks if coordinates entered are within Ireland
    const coordinatesValid = areCoordinateWithinIreland(latitude, longitude);
    if (!coordinatesValid) {
      message = "The provided coordinates are not within Ireland.";
      return;
    }

    const newUserTree: UserTree = { species, height, girth, province, latitude, longitude, accessibility, images: uploadedImageUrls };
    userTreesList = await addTree(newUserTree, userTreesList);
    await updateFirestore();
    
    resetInputFields(); // Resets the input fields after adding the tree
    message = ""; // Resets message
    
    // Delete images from Firebase Storage if deleted during adding tree. Images to delete array updated in handleDeleteImage
    await deleteImagesFromStorage(imagesToDelete);
  }

  // Deletes images from Firebase Storage
  async function deleteImagesFromStorage(imageUrls: string[]) {
    for (const imageUrl of imageUrls) {
      const imageRef = ref(storage, imageUrl); // Creates reference to identify images to delete
      try {
        await deleteObject(imageRef);
        console.log("Image deleted from Firebase Storage:", imageUrl);
      } catch (error) {
        console.error("Error deleting image from Firebase Storage:", error);
      }
    }
  }

  // Resets input fields
  function resetInputFields() {
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

  // Deletes a user tree, along with associated images
  async function handleDeleteTree(index: number, images: string[]) {
    imagesToDelete = [...imagesToDelete, ...images]; // Add the images to the imagesToDelete array
    userTreesList = await deleteTree(index, userTreesList);
    await updateFirestore();
    await deleteImagesFromStorage(imagesToDelete); // Delete the images from Firebase Storage
    imagesToDelete = []; // Reset the imagesToDelete array
  }

  // Edits a user tree. On submit, will add edited tree
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
  {#if message}
    <Message {message} />
  {/if}
  <form on:submit|preventDefault={handleAddTree}>
    <div class="field">
      <TreeDetails bind:height bind:girth bind:species bind:accessibility bind:province />
      <Coordinates bind:latitude bind:longitude />
    </div>
    <!-- Upload image -->
    <div class="field">
      <label class="label" for="uploadedImageUrls">Upload Images:</label>
      <input type="file" id="uploadedImageUrls" accept="image/*" multiple on:change={(event) => handleFileUpload(event)} />
    </div>
    <!-- Image previews -->
    <ImagePreview {uploadedImageUrls} {handleDeleteImage} />
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
              <button on:click={() => handleDeleteTree(index, tree.images)}> <i class="fas fa-trash-alt"></i> </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
{/if}
