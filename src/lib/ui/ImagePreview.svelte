<script lang="ts">
    export let uploadedImageUrls: string[] = [];
    export let handleDeleteImage: (imageUrl: string) => void;
  </script>
  
  <div>
    {#if uploadedImageUrls.length > 0}
      {#each uploadedImageUrls as imageURL}
        <div>
          <img src={imageURL} alt="Tree images" height="200" width="200" />
          <button on:click={() => handleDeleteImage(imageURL)}>Delete</button>
        </div>
      {/each}
    {/if}
  </div>