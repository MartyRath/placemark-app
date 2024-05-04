<script lang="ts">
  import RecentlyAddedTrees from "$lib/ui/RecentlyAddedTrees.svelte";
  import Card from "$lib/ui/Card.svelte";
  import { subTitle } from "$lib/stores";

  subTitle.set("View trees recently added by our contributors");
</script>

<Card title="Recently Added Trees">
  <RecentlyAddedTrees />
</Card>
