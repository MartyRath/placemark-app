<script lang="ts">
  import { subTitle, treeToEdit } from "$lib/stores";
  import type { UserTree } from "$lib/types/placemark-types";
    import Coordinates from "$lib/ui/Coordinates.svelte";
  import UserTrees from "$lib/ui/UserTrees.svelte";

  subTitle.set("Edit Tree");

  let species = "";
  let height = 0;
  let girth = 0;
  let province = "";
  let lng = 0.0;
  let lat = 0.0;

  const unsubscribe = treeToEdit.subscribe((value) => {
    if (value) {
      species = value.species;
      height = value.height;
      girth = value.girth;
      province = value.province;
      lng = value.longitude ?? 0.0;
      lat = value.latitude ?? 0.0;
    }
    else {
        console.log("No values updated");
    }
  });
  unsubscribe();
</script>

{#if treeToEdit !== undefined}
  <form>
    <div class="field">
      <label class="label">Species</label>
      <div class="control">
        <input class="input" type="text" bind:value={species}>
      </div>
    </div>
    <div class="field">
      <label class="label">Height</label>
      <div class="control">
        <input class="input" type="number" bind:value={height}>
      </div>
    </div>
    <div class="field">
      <label class="label">Girth</label>
      <div class="control">
        <input class="input" type="number" bind:value={girth}>
      </div>
    </div>
    <div class="field">
      <label class="label">Province</label>
      <div class="control">
        <input class="input" type="text" bind:value={province}>
      </div>
    </div>
    <Coordinates bind:lat bind:lng />
    <div class="field">
      <div class="control">
        <button class="button is-success is-fullwidth">Update Tree</button>
      </div>
    </div>
  </form>
{/if}