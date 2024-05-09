<script lang="ts">
  import UserTrees from "$lib/ui/UserTrees.svelte";
  import Card from "$lib/ui/Card.svelte";
  import { subTitle } from "$lib/stores";
  import { authStore } from "$lib/stores";

  subTitle.set("View your trees");

  let userTreesList: any[] = [];
  // Subscribe to authStore to update userTreesList
  authStore.subscribe((curr) => {
    userTreesList = curr.data.userTrees;
  });

</script>

{#if !$authStore.loading}
<Card title="Recently Added Trees">
  <UserTrees bind:userTreesList/>
</Card>
{/if}
