<script lang="ts">
    // @ts-ignore
    import Chart from "svelte-frappe-charts";
    import Card from "$lib/ui/Card.svelte";
    import { authStore } from "$lib/stores";
  
    let userTreesList: any[] = [];
    let barChartData: any = {};
    let pieChartData: any = {};
    let speciesList: any[] = [];
  
    // Subscribe to authStore to update userTreesList
    authStore.subscribe((curr) => {
      userTreesList = curr.data.userTrees;
      // Populate barChartData only after userTreesList populated
      if (!curr.loading) {
        // Shows height of each tree
        barChartData = {
          labels: userTreesList.map((tree) => tree.species),
          datasets: [{ values: userTreesList.map((tree) => tree.height) }]
        };

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
    });
  
    // This function counts the frequency of each species from the user's trees.
    function countSpecies(speciesList: string[]): Map<string, number> {
      const speciesCount = new Map<string, number>();
  
      speciesList.forEach((species) => {
        if (speciesCount.has(species)) {
          speciesCount.set(species, speciesCount.get(species)! + 1);
        } else {
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
  