<script lang="ts">
    export let trees = [
      {
        height: 40,
        accessibility: "yes",
        contributor: "bart@simpson.com",
        province: { name: "Leinster" },
        lat: "52.161290",
        lng: "-7.51540"
      },
      {
        height: 90,
        accessibility: "no",
        contributor: "marge@simpson.com",
        province: { name: "Leinster" },
        lat: "52.261290",
        lng: "-7.231540"
      },
      {
        height: 430,
        accessibility: "yes",
        contributor: "homer@simpson.com",
        province: { name: "Munster" },
        lat: "52.361290",
        lng: "-7.241540"
      }
    ];
  </script>
  
  <table class="table is-fullwidth">
    <thead>
      <th>Height</th>
      <th>Publicly accessible</th>
      <th>Province</th>
      <th>Contributor</th>
    </thead>
    <tbody>
      {#each trees as tree}
        <tr>
          <td>
            {tree.height}
          </td>
          <td>
            {tree.accessibility}
          </td><td>
            {tree.province.name}
          </td>
          <td>
            {tree.contributor}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  