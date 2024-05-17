<script lang="ts">
  import { Chart, type EChartsOptions } from "svelte-echarts";
  import Card from "$lib/ui/Card.svelte";
  import { userTreesStore } from "$lib/stores";
  import type { UserTree } from "$lib/types/placemark-types";
  import { onDestroy } from "svelte";
  import { doBarChart } from "$lib/services/echart-utils";

  let userTreesList: UserTree[] = [];
  let options: EChartsOptions = {};

  // Subscribe to userTreesStore
  const unsubscribe = userTreesStore.subscribe((trees: UserTree[]) => {
    userTreesList = trees;
  });

  // Use reactive statement to update options
  $: options = doBarChart(userTreesList);

  // Unsubcribe from userTreesStore when unmounting page
  onDestroy(() => {
    unsubscribe();
  });
</script>

<div class="columns">
  <div class="column">
    <div class="app">
      <strong>Tree Species by Height</strong>
      <Chart {options} />
    </div>
  </div>
  <div class="column">
    <strong>Tree Species Distribution</strong>
    <Chart {options} />
  </div>
</div>

<style>
  .app {
    width: 40vw;
    height: 50vh;
  }
</style>
