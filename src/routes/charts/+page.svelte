<script lang="ts">
  import Card from "$lib/ui/Card.svelte";
  import ECharts from "./ECharts.svelte";
  import { subTitle } from "$lib/stores";
  import Heading from "$lib/ui/Heading.svelte";
  import Menu from "$lib/ui/Menu.svelte";
  
  subTitle.set("View your trees");
</script>

<Menu />
<Heading />
<Card title="Charts">
  <ECharts />
</Card>
