<script lang="ts">
import Card from "$lib/ui/Card.svelte";
import ECharts from "./ECharts.svelte";
import { subTitle } from "$lib/stores";

subTitle.set("View your trees");

</script>

<Card title="Charts">
  <ECharts />
</Card>