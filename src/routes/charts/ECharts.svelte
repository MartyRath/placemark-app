<script lang="ts">
  import { Chart, type EChartsOptions } from "svelte-echarts";
  import { userTreesStore } from "$lib/stores";
  import type { UserTree } from "$lib/types/placemark-types";
  import { onDestroy } from "svelte";
  import { doBarChart, doPieChart } from "$lib/services/echart-utils";

  let userTreesList: UserTree[] = [];
  let barChartOptions: EChartsOptions = {};
  let pieChartOptions: EChartsOptions = {};

  // Subscribe to userTreesStore
  const unsubscribe = userTreesStore.subscribe((trees: UserTree[]) => {
    userTreesList = trees;
  });

  // Use reactive statement to update bar chart options
  $: barChartOptions = doBarChart(userTreesList);
  console.log('userTreesList:', userTreesList);
  // Use reactive statement to update pie chart options
  $: pieChartOptions = doPieChart(userTreesList);

  // Unsubscribe from userTreesStore when unmounting page
  onDestroy(() => {
    unsubscribe();
  });
</script>

<div class="columns">
  <div class="column">
    <div class="app">
      <strong>Tree Species by Height</strong>
      <Chart options={barChartOptions} />
    </div>
  </div>
  <div class="column">
    <div class="app">
      <strong>Tree Species Distribution</strong>
      <Chart options={pieChartOptions} />
    </div>
  </div>
</div>

<style>
  .app {
    width: 40vw;
    height: 50vh;
  }
</style>