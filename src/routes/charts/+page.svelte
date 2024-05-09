<script lang="ts">
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import UserTrees from "$lib/ui/UserTrees.svelte";
  import Card from "$lib/ui/Card.svelte";
  import { subTitle } from "$lib/stores";
  import { authStore } from "$lib/stores";

  subTitle.set("Charts Charts Charts");

  let userTreesList: any[] = [];
  // Subscribe to authStore to update userTreesList
  authStore.subscribe((curr) => {
    userTreesList = curr.data.userTrees;
  });

  const barChartData = {
    labels: userTreesList.map(tree => tree.species),
    datasets: [
      {
        values: userTreesList.map(tree => tree.height)
      }
    ]
  };

  const pieChartData = {
    labels: userTreesList.map(tree => tree.species),
    datasets: [
      {
        values: userTreesList.map(tree => tree.height)
      }
    ]
  };
</script>


<div class="columns">
    <div class="column">
      <Card title="Trees Height">
        <Chart data={barChartData} type="bar" />
      </Card>
    </div>
    <div class="column has-text-centered">
      <Card title="Pie">
        <Chart data={pieChartData} type="pie" />
      </Card>
    </div>
  </div>
