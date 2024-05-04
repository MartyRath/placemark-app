<script lang="ts">
  import { subTitle } from "$lib/stores";
  import AddTreeForm from "./AddTreeForm.svelte";

  subTitle.set("Add a Tree");
</script>

<AddTreeForm />