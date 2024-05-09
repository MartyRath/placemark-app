<script lang="ts">
  import { subTitle, treeToEdit } from "$lib/stores";

  subTitle.set("Edit Tree");

  let species = "";
  let height = 0;
  let girth = 0;
  let province = "";
  let longitude = 0.0;
  let latitude = 0.0;

  const unsubscribe = treeToEdit.subscribe((value) => {
    if (value) {
    species = value.species;
    height = value.height;
    girth = value.girth;
    province = value.province;
    longitude = value.longitude ?? 0.0;
    latitude = value.latitude ?? 0.0;
    }
  });
  unsubscribe();
</script>




