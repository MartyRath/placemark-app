<script lang="ts">
  import UserTrees from "$lib/ui/UserTrees.svelte";
  import Card from "$lib/ui/Card.svelte";
  import { subTitle } from "$lib/stores";
  import type { UserTree } from "$lib/types/placemark-types";

  import { onMount } from 'svelte';
  import { db } from '$lib/firebase/firebase';
  import { doc, getDoc } from 'firebase/firestore';
  import { authStore } from "$lib/stores";

  subTitle.set("View your trees");

  // Get the user trees from Firestore
  let trees: UserTree[] = [];

  onMount(async () => {
    try {
      const userDocRef = doc(db, 'users', $authStore.user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        trees = userData.userTrees || [];
      } else {
        console.log('User document does not exist');
      }
    } catch (error) {
      console.error('Error retrieving userTrees from Firestore:', error);
    }
  });
</script>

<Card title="Recently Added Trees">
  <UserTrees bind:trees/>
</Card>
