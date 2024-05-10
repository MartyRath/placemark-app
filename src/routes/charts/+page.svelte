<script lang="ts">
import Card from "$lib/ui/Card.svelte";
import Charts from "./Charts.svelte";
import { subTitle } from "$lib/stores";

subTitle.set("View your trees");

</script>

<Card title="Charts">
  <Charts />
</Card>