<script lang="ts">
import { subTitle } from "$lib/stores";
    import Card from "$lib/ui/Card.svelte";
    import LeafletMap from "$lib/ui/LeafletMap.svelte";
  
  subTitle.set("Find trees");
  </script>
  
  <Card title="Tree Locations">
    <LeafletMap height={60}/>
  </Card>
  