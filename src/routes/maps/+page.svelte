<script lang="ts">
  import { authStore, subTitle } from "$lib/stores";
  import Card from "$lib/ui/Card.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import type { UserTree } from "$lib/types/placemark-types";

  subTitle.set("Find Your Trees");
  let map: LeafletMap;
  let userTreesList: UserTree[] = []; // Assuming UserTree is the correct type for userTreesList

  
  // Subscribe to authStore to update userTreesList
  authStore.subscribe((curr) => {
    userTreesList = curr.data.userTrees;
    if (!curr.loading) {
      updateMapData();
    }
  });

  function updateMapData() {
      // Iterate over userTreesList and add markers for each tree
      userTreesList.forEach((tree: UserTree) => {
        const popup = `Species: ${tree.species} | Height: ${tree.height} | Girth: ${tree.girth}
                      Coordinates: ${tree.latitude}, ${tree.longitude}`;
        console.log(tree.latitude, tree.longitude);
        map.addMarker(tree.latitude, tree.longitude, popup);
      });
    }
</script>

{#if !authStore.loading}
<Card title="Tree Locations">
  <LeafletMap height={60} bind:this={map} />
</Card>
{/if}