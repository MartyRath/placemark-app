<script lang="ts">
  import { Chart, type EChartsOptions } from "svelte-echarts";
  import Card from "$lib/ui/Card.svelte";
  import { authStore, userTreesStore } from "$lib/stores";
  import type { UserTree } from "$lib/types/placemark-types";
  import { onDestroy } from "svelte";
  import { doChart } from "$lib/services/echart-utils";

  let userTreesList: UserTree[] = [];
  let options: EChartsOptions = {};

  // Subscribe to userTreesStore
  const unsubscribe = userTreesStore.subscribe((trees: UserTree[]) => {
    userTreesList = trees;
    
  });

  // Use reactive statement to update options
  $: options = doChart(userTreesList); 

  // Unsubcribe from userTreesStore when unmounting page
  onDestroy(() => {
    unsubscribe();
  });

</script>

<div class="app">
  <Chart {options} />
</div>

<style>
  .app {
    width: 100vw;
    height: 100vh;
  }
</style>
