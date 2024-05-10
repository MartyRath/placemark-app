<script lang="ts">
  import { subTitle } from "$lib/stores";
  import Card from "$lib/ui/Card.svelte";

  subTitle.set("Ready to become a tree hugger?");
</script>

<Card title="How to measure and identify trees">
<div class="columns is-centered">
  <div class="column is-5 has-text-centered">
    <h2><strong>Estimate a tree's height</strong></h2>
    <iframe
      width="560" height="315"
      src="https://www.youtube.com/embed/cDy5OjfMfZ8?si=7E31caDWy4Zx3nkX&amp;start=34" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
    ></iframe>
  </div>
  <div class="column is-5 is-offset-1 has-text-centered">
    <h2><strong>Measure a tree's girth</strong></h2>
    <p>
      An easy and accurate way to measure a tree's girth is to use a soft measuring tape.
      <br />If you don't have a measuring tape, you can always use your arms to get a rough measurement.
      <br /> Wrap your arms around the tree, then measure your armspan later.
    </p>
  </div>
</div>


<div class="container">
  <h2><strong>Identify species by leaf</strong></h2>
  <p>Leaves are often used to identify plants and trees. Below is a guide to identify some Irish trees by leaf.</p>
  <figure class="image">
    <img class="object-fit" src="/identify-trees-leaf.jpg" alt="Native Irish tree leaf species guide" />
  </figure>
</div>
</Card>