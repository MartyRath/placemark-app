<script lang="ts">
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import Card from "$lib/ui/Card.svelte";
  import { authStore } from "$lib/stores";
  import { generateUserTreeByHeight, generateUserTreeSpeciesDistribution } from "$lib/services/chart-utils";

  let userTreesList: any[] = [];
  let barChartData: any = {};
  let pieChartData: any = {};

  // Subscribe to authStore to update userTreesList
  authStore.subscribe((curr) => {
    userTreesList = curr.data.userTrees;
    // Populate barChartData only after userTreesList populated
    if (!curr.loading) {
      updateChartData();
    }
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
