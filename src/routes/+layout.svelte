<script lang="ts">
  import Heading from "$lib/ui/Heading.svelte";
  import Menu from "$lib/ui/Menu.svelte";

  import { onMount } from "svelte";
  import { auth, db } from "$lib/firebase/firebase";
  import { getDoc, doc, setDoc } from "firebase/firestore";
  import { authStore } from "$lib/stores";

  // Routes accessible by non logged in users
  const nonAuthRoutes = ["/", "/login", "/signup"];

  // On page load
  onMount(() => {
    // Listener for auth state change (log in/out, register) from input user, log out user null
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      const currentPath = window.location.pathname; // gets the current path

      // Redirects to home page if unauthorised user attempting to access protected route
      if (!user && !nonAuthRoutes.includes(currentPath)) {
        window.location.href = "/";
        return;
      }

      // If an logged in user, redirects logged in user to addTree page
      if (user && currentPath === "/") {
        window.location.href = "/addTree";
        return;
      }

      // Exits if not a logged in user
      if (!user) {
        return;
      }

      let dataToPushToStore;
      // Firebase database after establishing logged in user
      // Creates a Firestore document reference using logged in user id.
      const docRef = doc(db, "users", user.uid);
      // Uses reference to get the user's current Firestore data
      const docSnap = await getDoc(docRef);

      // If user has no existing db, creates one.
      if (!docSnap.exists()) {
        const userRef = doc(db, "users", user.uid);
        dataToPushToStore = {
          email: user.email,
          userTrees: []
        };
        await setDoc(
          userRef,
          dataToPushToStore,
          { merge: true } // Will add new info rather than overwriting it
        );
      } else {
        const userData = docSnap.data(); // Pulls all saved data
        dataToPushToStore = userData;
      }
      authStore.update((curr) => {
        return {
          ...curr,
          user,
          data: dataToPushToStore,
          loading: false
        };
      });
    });
    return unsubscribe; //Stop listening for auth state changes, log ins/outs
  });
</script>

<div class="container">
  {#if $authStore.user}
    <Menu />
    <Heading />
  {/if}
  <slot />
</div>
