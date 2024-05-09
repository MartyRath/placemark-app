<script lang="ts">
  import Card from "$lib/ui/Card.svelte";
  import { subTitle, editingMode } from "$lib/stores";
  import AddTreeForm from "./AddTreeForm.svelte";

  subTitle.set("Add a Tree");
  let cardTitle = "";

  // Dynamically update card title based on editingMode
  $: {
    // Update the title based on the value of editingMode
    if ($editingMode) {
      cardTitle = "Edit your tree";
    }
    else {
      cardTitle = "Add your tree";
    }
  }
</script>

<Card title={cardTitle}>
  <AddTreeForm />
</Card>