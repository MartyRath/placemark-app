<script lang="ts">
  import UserTrees from "$lib/ui/UserTrees.svelte";
  import Card from "$lib/ui/Card.svelte";
  import { subTitle, userTreesStore } from "$lib/stores";
  import { authStore } from "$lib/stores";
  import { onDestroy } from "svelte";
  import type { UserTree } from "$lib/types/placemark-types";
  import Heading from "$lib/ui/Heading.svelte";
  import Menu from "$lib/ui/Menu.svelte";

  subTitle.set("View your trees");
  let userTreesList: UserTree[] = [];
  // Subscribe to userTreesStore
  const unsubscribe = userTreesStore.subscribe((trees: UserTree[]) => {
    userTreesList = trees;
  });

  // Unsubcribe from userTreesStore when unmounting page
  onDestroy(() => {
    unsubscribe();
  });
</script>

{#if !$authStore.loading}
  <Menu />
  <Heading />
  <Card title="Recently Added Trees">
    <UserTrees bind:userTreesList />
  </Card>
{/if}
