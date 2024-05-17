<script lang="ts">
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import Card from "$lib/ui/Card.svelte";
  import { authStore, userTreesStore } from "$lib/stores";
  import { generateUserTreeByHeight, generateUserTreeSpeciesDistribution } from "$lib/services/chart-utils";
  import type { UserTree } from "$lib/types/placemark-types";
  import { onDestroy } from "svelte";

  let userTreesList: UserTree[] = [];
  let barChartData: any = {};
  let pieChartData: any = {};

  // Subscribe to userTreesStore
  const unsubscribe = userTreesStore.subscribe((trees: UserTree[]) => {
    userTreesList = trees;
    updateChartData();
  });

  // Unsubcribe from userTreesStore when unmounting page
  onDestroy(() => {
    unsubscribe();
  });

  // Pushes populated userTreesList to charts
  function updateChartData() {
    barChartData = generateUserTreeByHeight(userTreesList);
    pieChartData = generateUserTreeSpeciesDistribution(userTreesList);
  }
</script>

{#if !$authStore.loading}
  <div class="columns">
    <div class="column">
      <Card title="Trees Height">
        <Chart data={barChartData} type="bar" />
      </Card>
    </div>
    <div class="column has-text-centered">
      <Card title="Species Distribution">
        <Chart data={pieChartData} type="pie" />
      </Card>
    </div>
  </div>
{/if}
