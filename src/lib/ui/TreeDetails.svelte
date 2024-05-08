<script lang="ts">
  export let height = 0.0;
  export let girth = 0.0;
  export let species = "";
  export let description = "";
  export let selectedSpecies = "Douglas fir";

  export const speciesList = [
    { name: "Alder" },
    { name: "Ash" },
    { name: "Atlas Cedar" },
    { name: "Beech" },
    { name: "Birch" },
    { name: "Coastal Redwood" },
    { name: "Douglas Fir" },
    { name: "European Larch" },
    { name: "Giant Redwood" },
    { name: "Grand Fir" },
    { name: "Hazel" },
    { name: "Holly" },
    { name: "Lawson Cypress" },
    { name: "Norway Spruce" },
    { name: "Noble Fir" },
    { name: "Oak" },
    { name: "Pedunculate Oak" },
    { name: "Rowan" },
    { name: "Scots Pine" },
    { name: "Sessile Oak" },
    { name: "Silver Fir" },
    { name: "Sitka Spruce" },
    { name: "Western Hemlock" },
    { name: "other" }
  ];
</script>

<div class="box field is-horizontal">
  <div class="field-label is-normal">
    <label for="height" class="label">height</label>
  </div>
  <div class="field-body">
    <div class="field">
      <p class="control is-expanded">
        <input id="height" class="input" type="float" bind:value={height} />
      </p>
    </div>
    <div class="field-label is-normal">
      <label for="girth" class="label">girth</label>
    </div>
    <div class="field">
      <p class="control is-expanded">
        <input id="girth" class="input" type="float" bind:value={girth} />
      </p>
    </div>
  </div>
</div>
<div class="field">
  <label class="label" for="species">Select species:</label>
  <div class="select">
    <select bind:value={selectedSpecies}>
      {#each speciesList as species}
        <option>{species.name}</option>
      {/each}
    </select>
  </div>
</div>
