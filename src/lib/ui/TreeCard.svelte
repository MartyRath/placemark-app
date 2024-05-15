<script lang="ts">
  export let userTreesList: any[] = [];
</script>

<div class="columns is-multiline">
  {#each userTreesList as tree}
    <div class="column is-one-third">
      <div class="card">
        <div class="card-image">
          {#if tree.images.length > 0}
            <figure class="image is-4by3">
              <img src={tree.images[0]} alt="{tree.species} tree located in {tree.province}" />
            </figure>
          {:else}
          <br><br>
          <div class="has-text-centered is-vcentered">
          <span class="icon is-large"> <i class="fas fa-tree fa-3x"></i></span>
            <p>No images available</p><br>
        </div>
          {/if}
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">{tree.species}</p>
              <p class="subtitle is-6">Height: {tree.height}m, Girth: {tree.girth}m</p>
              <p class="subtitle is-6">Province: {tree.province}</p>
              <p class="subtitle is-6">Coordinates: {tree.latitude}, {tree.longitude}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>
