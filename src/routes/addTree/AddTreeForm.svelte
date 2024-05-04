<script lang="ts">
  import Coordinates from "$lib/ui/Coordinates.svelte";

  let lat = 52.160858;
  let lng = -7.15242;

  const provinceList = [{ name: "Connacht" }, { name: "Munster" }, { name: "Leinster" }, { name: "Ulster" }];

  let height = 0;
  let selectedprovince = "Leinster";
  let publiclyAccessible = ["yes", "no"];
  let selectedAccessibility = "yes";

  async function addTree() {
    console.log(`New tree just added: Height: ${height} metres | Location: ${selectedprovince} | Publicly accessible: ${selectedAccessibility}`);
    console.log(`lat: ${lat}, lng: ${lng}`);
  }
</script>

<form on:submit|preventDefault={addTree}>
  <div class="field">
    <label class="label" for="height">Enter height:</label>
    <input bind:value={height} class="input" id="height" name="height" type="number" />
  </div>
  <div class="field">
    <div class="control">
      <label class="label" for="height">Publicly Accessible:</label>
      {#each publiclyAccessible as accessibility}
        <input bind:group={selectedAccessibility} class="radio" type="radio" value={accessibility} /> {accessibility}
      {/each}
    </div>
  </div>
  <div class="field">
    <label class="label" for="height">Select province:</label>
    <div class="select">
      <select bind:value={selectedprovince}>
        {#each provinceList as province}
          <option>{province.name}</option>
        {/each}
      </select>
    </div>
  </div>
  <Coordinates bind:lat bind:lng />
  <div class="field">
    <div class="control">
      <button class="button is-success is-fullwidth">Add Tree</button>
    </div>
  </div>
</form>
