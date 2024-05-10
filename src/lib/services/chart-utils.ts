import type { DataSet } from "$lib/types/placemark-types";

export function generateUserTreeByHeight(userTreesList: any[]): DataSet {
  const userTreeByHeight: DataSet = {
    labels: [],
    datasets: [
      {
        values: []
      }
    ]
  };

  userTreesList.forEach((tree) => {
    userTreeByHeight.labels.push(tree.species);
    userTreeByHeight.datasets[0].values.push(tree.height);
  });

  return userTreeByHeight;
}
