<script lang="ts">
  import RecentlyAddedTrees from "$lib/ui/RecentlyAddedTrees.svelte";
  import Card from "$lib/ui/Card.svelte";
  import { subTitle } from "$lib/stores";
  import { onMount } from "svelte";
  import type { UserTree } from "$lib/types/placemark-types"; 
  // May need to import User/currentSession(with user), get, firebase function

  subTitle.set("View trees recently added by our contributors");
  
  // Initialise userTree array
  let userTrees: UserTree[] = [];
  // Retrieve user trees on mount
  onMount(async () => {
    userTrees = await firebaseService.SOMEFUNCTIONTORETRIVETREES(get?INPUT USER ID?)
  });
</script>

<Card title="Recently Added Trees">
  // Can pass in userTrees here:
  <RecentlyAddedTrees />
</Card>
