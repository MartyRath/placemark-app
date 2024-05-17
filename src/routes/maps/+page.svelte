<script lang="ts">
  import { subTitle, userTreesStore } from "$lib/stores";
  import Card from "$lib/ui/Card.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import type { UserTree } from "$lib/types/placemark-types";
  import { onDestroy, onMount } from "svelte";
  import Heading from "$lib/ui/Heading.svelte";
  import Menu from "$lib/ui/Menu.svelte";
  subTitle.set("Find Your Trees");

  let map: LeafletMap;
  let userTreesList: UserTree[] = [];

  // Subscribe to userTreesStore
  const unsubscribe = userTreesStore.subscribe((trees: UserTree[]) => {
    userTreesList = trees;
    updateMapData();
  });

  onMount(() => {
    updateMapData();
  });

  // Unsubscribe from userTreesStore when unmounting page
  onDestroy(() => {
    unsubscribe();
  });

  function updateMapData() {
    // Iterate over userTreesList and add markers for each tree
    userTreesList.forEach((tree: UserTree) => {
      map?.addMarker(tree); // When map is undefined, component first rendered
    });

    const lastAddedTree = userTreesList[userTreesList.length - 1];
    if (lastAddedTree) map.moveTo(lastAddedTree.latitude, lastAddedTree.longitude);
  }
</script>

<Menu />
    <Heading />
<Card title="Tree Locations">
  <LeafletMap height={60} bind:this={map} />
</Card>