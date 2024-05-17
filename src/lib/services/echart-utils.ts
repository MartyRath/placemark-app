import type { UserTree } from "$lib/types/placemark-types";
import type { EChartsOptions } from 'svelte-echarts';


export function doBarChart(userTreesList: UserTree[]): EChartsOptions {
  const xAxisData = [];
  const yAxisData = [];

  for (const userTree of userTreesList) {
    xAxisData.push(userTree.species);
    yAxisData.push(userTree.height);
  }

  const options: EChartsOptions = {
    xAxis: {
      data: xAxisData,
      type: 'category',
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: yAxisData,
        type: 'bar',
      },
    ],
  };

  return options;
}

export function doPieChart(userTreesList: UserTree[]): EChartsOptions {
  // Creates a map object (species: count)
  const speciesCount = new Map<string, number>();

  // Count the frequency of each species
  userTreesList.forEach((tree) => { // Iteratate over each tree
    const species = tree.species; // Store species from trees
    const count = speciesCount.get(species) || 0; // gets the current count. If species not yet mapped, returns 0
    speciesCount.set(species, count + 1); // Adds 1 to the count, updates speciesCount
  });

  // Prepare the data for the pie chart
  const data = Array.from(speciesCount.entries()).map(([name, value]) => ({
    value,
    name,
  }));

  const options: EChartsOptions = {
    series: [
      {
        type: "pie",
        data,
      },
    ],
  };

  return options;
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
