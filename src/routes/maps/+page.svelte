<script lang="ts">
  import Menu from "$lib/ui/Menu.svelte";
  import Heading from "$lib/ui/Heading.svelte";
  import Card from "$lib/ui/Card.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
</script>

<Card title="Tree Locations">
  <LeafletMap height={60}/>
</Card>
