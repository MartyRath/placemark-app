<script lang="ts">
  import { subTitle, treeToEdit } from "$lib/stores";

  subTitle.set("Edit Tree");

  let species = "";
  let height = "";
  let girth = "";
  let province = "";
  let longitude = "";
  let latitude = "";

  const unsubscribe = treeToEdit.subscribe((value) => {
    species = value.species;
    height = value.height;
    girth = value.girth;
    province = value.province;
    longitude = value.longitude;
    latitude = value.latitude;
  });
  unsubscribe();
</script>




