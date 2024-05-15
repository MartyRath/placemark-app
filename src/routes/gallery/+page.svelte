<script lang="ts">
    import UserTrees from "$lib/ui/UserTrees.svelte";
    import Card from "$lib/ui/Card.svelte";
    import { subTitle, userTreesStore } from "$lib/stores";
    import { authStore } from "$lib/stores";
      import { onDestroy } from "svelte";
      import type { UserTree } from "$lib/types/placemark-types";
    import TreeCard from "$lib/ui/TreeCard.svelte";
  
    subTitle.set("View your tree images");
    let userTreesList: UserTree[] = [];
    // Subscribe to userTreesStore
    const unsubscribe = userTreesStore.subscribe((trees: UserTree[]) => {
      userTreesList = trees;
    });
  
    // Unsubcribe from userTreesStore when unmounting page
    onDestroy(() => {
      unsubscribe();
    });
  
  </script>
  
  {#if !$authStore.loading}
  <Card title="Images">
    <TreeCard bind:userTreesList />
  </Card>
  {/if}