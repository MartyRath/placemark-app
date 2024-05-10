<script lang="ts">
  import Card from "$lib/ui/Card.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import { subTitle } from "$lib/stores";

subTitle.set("Find your trees");
</script>

<Card title="Tree Locations">
  <LeafletMap height={60} />
</Card>
