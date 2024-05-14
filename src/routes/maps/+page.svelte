<script lang="ts">
  import { subTitle, userTreesStore } from "$lib/stores";
  import Card from "$lib/ui/Card.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import type { UserTree } from "$lib/types/placemark-types";
  import { onDestroy, onMount } from "svelte";

  subTitle.set("Find Your Trees");
  let map: LeafletMap;
  let userTreesList: UserTree[] = [];

  // Subscribe to userTreesStore
  const unsubscribe = userTreesStore.subscribe((trees: UserTree[]) => {
    userTreesList = trees; 
  });

  // Unsubcribe from userTreesStore when unmounting page
  onDestroy(() => {
    unsubscribe();
  });

  onMount(async () => {
    
    const leaflet = await import("leaflet");
    updateMapData();
  });

  function updateMapData() {
    // Iterate over userTreesList and add markers for each tree
    userTreesList.forEach((tree: UserTree) => {
      const popup = `Species: ${tree.species} | Height: ${tree.height} | Girth: ${tree.girth}
                      Coordinates: ${tree.latitude}, ${tree.longitude}`;

      map.addMarker(tree.latitude, tree.longitude, popup);
    });

    const lastAddedTree = userTreesList[userTreesList.length - 1];
    console.log(lastAddedTree);
    if (lastAddedTree) map.moveTo(lastAddedTree.latitude, lastAddedTree.longitude);
  }
</script>

<Card title="Tree Locations">
  <LeafletMap height={60} bind:this={map} />
</Card>
