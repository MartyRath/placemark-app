<script lang="ts">
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import UserTrees from "$lib/ui/UserTrees.svelte";
  import Card from "$lib/ui/Card.svelte";
  import { subTitle } from "$lib/stores";
  import { authStore } from "$lib/stores";

  subTitle.set("View your trees");

  let userTreesList: any[] = [];
  let barChartData: any = null;

  // Subscribe to authStore to update userTreesList
  authStore.subscribe((curr) => {
    userTreesList = curr.data.userTrees;
    // Populate barChartData only after userTreesList populated
    if (!curr.loading) {

      barChartData = {
        labels: userTreesList.map((tree) => tree.species),
        datasets: [{ values: userTreesList.map((tree) => tree.height) }]
      };
    }
  });
</script>

{#if !$authStore.loading}
  <div class="columns">
    <div class="column">
      <Card title="Trees Height">
        <Chart data={barChartData} type="bar" />
      </Card>
    </div>
  </div>
{/if}
