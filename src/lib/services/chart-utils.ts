import type { DataSet } from "$lib/types/placemark-types";

export function generateUserTreeByHeight(userTreesList: any[]): DataSet {
  const userTreeByHeight: DataSet = {
    labels: [],
    datasets: [{ values: [] }]
  };

  userTreesList.forEach((tree) => {
    userTreeByHeight.labels.push(tree.species);
    userTreeByHeight.datasets[0].values.push(tree.height);
  });

  return userTreeByHeight;
}

export function generateUserTreeSpeciesDistribution(userTreesList: any[]): DataSet {
  const userTreeBySpecies: DataSet = {
    labels: [],
    datasets: [{ values: [] }]
  };

  // Returns list of tree species
  const speciesList = userTreesList.map((tree) => tree.species);
  // Counts how many times a species occurs
  const speciesCount = countSpecies(speciesList);
  
  // Add key values to labels (species, no duplicates)
  userTreeBySpecies.labels = Array.from(speciesCount.keys());
  // Add count of species to datasets
  userTreeBySpecies.datasets[0].values = Array.from(speciesCount.values());

  return userTreeBySpecies;
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
