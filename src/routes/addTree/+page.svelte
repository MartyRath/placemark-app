<script lang="ts">
  import Card from "$lib/ui/Card.svelte";
  import { subTitle } from "$lib/stores";
  import AddTreeForm from "./AddTreeForm.svelte";

  subTitle.set("Add a Tree");
</script>

<Card title="Add your tree">
  <AddTreeForm />
</Card>