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

  // Converts speciesCount map object into an array.
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
