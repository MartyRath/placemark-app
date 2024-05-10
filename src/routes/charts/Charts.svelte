<script lang="ts">
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import Card from "$lib/ui/Card.svelte";
  import { authStore } from "$lib/stores";
  import type { DataSet } from "$lib/types/placemark-types";
  import { generateUserTreeByHeight } from "$lib/services/chart-utils";

  let userTreesList: any[] = [];
  let speciesList: any[] = [];
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

  function updateChartData() {
    // Shows height of each user tree
    barChartData = generateUserTreeByHeight(userTreesList);

    // Returns list of tree species
    speciesList = userTreesList.map((tree) => tree.species);
    // Counts how many times a species occurs
    const speciesCount = countSpecies(speciesList);
    // Pie chart showing species distribution
    pieChartData = {
      labels: Array.from(speciesCount.keys()), // Species names as labels
      datasets: [{ values: Array.from(speciesCount.values()) }]
    };
  }

  // This function counts the frequency of each species from the user's trees.
  function countSpecies(speciesList: string[]): Map<string, number> {
    const speciesCount = new Map<string, number>();
    // Iterating through each species in list
    speciesList.forEach((species) => {
      // Checks if species is already mapped
      if (speciesCount.has(species)) {
        speciesCount.set(species, speciesCount.get(species)! + 1);
      } else {
        // If species already exists, adds to count
        speciesCount.set(species, 1);
      }
    });
    return speciesCount;
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
