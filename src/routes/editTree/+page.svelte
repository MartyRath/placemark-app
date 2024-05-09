<script lang="ts">
  import { subTitle, treeToEdit } from "$lib/stores";
  import type { UserTree } from "$lib/types/placemark-types";
    import Coordinates from "$lib/ui/Coordinates.svelte";
    import TreeDetails from "$lib/ui/TreeDetails.svelte";
  import UserTrees from "$lib/ui/UserTrees.svelte";

  subTitle.set("Edit Tree");

  const provinceList = [{ name: "Connacht" }, { name: "Munster" }, { name: "Leinster" }, { name: "Ulster" }];
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
        <TreeDetails bind:height bind:girth bind:species />
      </div>
      <div class="field">
      </div>
      <div class="field">
        <label class="label" for="province">Select province:</label>
        <div class="select">
          <select bind:value={province}>
            {#each provinceList as province}
              <option>{province.name}</option>
            {/each}
          </select>
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