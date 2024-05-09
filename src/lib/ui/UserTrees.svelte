<script lang="ts">
  export let trees = []; // Initialize trees array to hold userTrees data
</script>

<table class="table is-fullwidth">
  <thead>
    <th>Species</th>
    <th>Height</th>
    <th>Girth</th>
    <th>Province</th>
    <th>Contributor</th>
  </thead>
  <tbody>
    {#each trees as tree}
      <tr>
        <td>
          {tree.species}
        </td>
        <td>
          {tree.height}
        </td>
        <td>
          {tree.girth}
        </td>
        <td>
          {tree.province}
        </td>
        <td>
          username?
        </td>
      </tr>
    {/each}
  </tbody>
</table>
