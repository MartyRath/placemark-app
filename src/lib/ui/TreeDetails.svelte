<script lang="ts">
  export let height = 0.0;
  export let girth = 0.0;
  export let species = "Douglas fir";
  export let accessibility = "yes";
  export let province = "Leinster";

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
    <select bind:value={species}>
      {#each speciesList as species}
        <option>{species.name}</option>
      {/each}
    </select>
  </div>
</div>

<div class="field">
  <label class="label">Publicly Accessible:</label>
  <div class="control">
    {#each ['yes', 'no'] as option}
      <label class="radio">
        <input type="radio" bind:group={accessibility} value={option} />
        {option}
      </label>
    {/each}
  </div>
</div>

<div class="field">
  <label class="label" for="province">Select Province:</label>
  <div class="select">
    <select bind:value={province}>
      {#each [
        { name: "Connacht" },
        { name: "Munster" },
        { name: "Leinster" },
        { name: "Ulster" }
      ] as province}
        <option>{province.name}</option>
      {/each}
    </select>
  </div>
</div>