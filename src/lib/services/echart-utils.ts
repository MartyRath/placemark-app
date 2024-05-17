import type { UserTree } from "$lib/types/placemark-types";
import type { EChartsOptions } from 'svelte-echarts';


export function doChart(userTreesList: UserTree[]): EChartsOptions {
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

export function generateUserTreeByHeight(userTreesList: UserTree[]): EChartsOption {
    const xAxisData: string[] = [];
    const yAxisData: number[] = [];

  for (const userTree of userTreesList) {
  xAxisData.push(userTree.species);
  yAxisData.push(userTree.height);
}
  const options: EChartsOption = {
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
  }
  return options;
}

  export function generateUserTreeSpeciesDistribution(userTreesList: UserTree[]): EChartsOption {
    const speciesList = userTreesList.map(tree => tree.species);
    const speciesCount = countSpecies(speciesList);
  
    return {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Species',
          type: 'pie',
          radius: '50%',
          data: Array.from(speciesCount.entries()).map(([name, value]) => ({ name, value })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
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
