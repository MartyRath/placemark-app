<script lang="ts">
  import Card from "$lib/ui/Card.svelte";
  import { subTitle, editingMode } from "$lib/stores";
  import AddTreeForm from "./AddTreeForm.svelte";
  import { userTreesStore, authStore} from "$lib/stores";
  import Heading from "$lib/ui/Heading.svelte";
  import Menu from "$lib/ui/Menu.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import type { UserTree } from "$lib/types/placemark-types";
  import { onDestroy, onMount } from "svelte";
  import AnotherLeafletMap from "$lib/ui/AnotherLeafletMap.svelte";

  subTitle.set("Welcome tree lovers");
  let cardTitle = "";

  // Dynamically update card title based on editingMode
  $: {
    // Update the title based on the value of editingMode
    if ($editingMode) {
      cardTitle = "Edit your tree";
    }
    else {
      cardTitle = "Add your tree";
    }
  }


  // Maps
  let map: LeafletMap;
  let anotherMap: AnotherLeafletMap;
  let userTreesList: UserTree[] = [];

  // Subscribe to userTreesStore
  const unsubscribe = userTreesStore.subscribe((trees: UserTree[]) => {
    userTreesList = trees;
    updateMapData();
  });

  onMount(async() => {
  
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
      anotherMap?.addMarker(tree);
    });

    const lastAddedTree = userTreesList[userTreesList.length - 1];
    if (lastAddedTree) {
      map.moveTo(lastAddedTree.latitude, lastAddedTree.longitude)
      anotherMap.moveTo(lastAddedTree.latitude, lastAddedTree.longitude)
    };
  }
</script>

<Menu />
    <Heading />
<Card>
  <div class="columns">
    <div class="column">
      <AnotherLeafletMap height={40} bind:this={anotherMap} />
      <LeafletMap height={60} bind:this={map} />
      
    </div>
    <div class="column">
      <h2>{cardTitle}</h2>
      <AddTreeForm />
    </div>
  </div>
  
</Card>