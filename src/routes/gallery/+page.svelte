<script lang="ts">
  import Card from "$lib/ui/Card.svelte";
  import { subTitle, userTreesStore } from "$lib/stores";
  import { onDestroy } from "svelte";
  import type { UserTree } from "$lib/types/placemark-types";
  import TreeCard from "$lib/ui/TreeCard.svelte";
  import Heading from "$lib/ui/Heading.svelte";
  import Menu from "$lib/ui/Menu.svelte";

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

<Menu />
<Heading />
<Card title="Images">
  <TreeCard bind:userTreesList />
</Card>
