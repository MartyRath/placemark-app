<script lang="ts">
  import { authStore } from "$lib/stores";
  import { onMount } from "svelte";

  let userEmail = "";

  // Get user email on component mount
  onMount(() => {
    const unsubscribe = authStore.subscribe((value) => {
      if (value.user) {
        userEmail = value.user.email;
      }
    });
    return unsubscribe;
  });

</script>

<nav class="navbar is-full-width">
  <div class="container">
    <div class="navbar-brand">
      <a class="navbar-item" href="/dashboard">
        <span class="icon"> <i class="fas fa-map-marker-alt"></i></span><span class="icon mr-1"> <i class="fas fa-tree"></i></span><span><strong>Placemark App</strong> </span>
      </a>
    </div>
    <div id="navbarMenu" class="navbar-menu">
      <div class="navbar-end">
        <a class="navbar-item" href="/contributorGuide"> Contributor's Guide </a>
        <a class="navbar-item" href="/addTree"> Add Tree </a>
        <a class="navbar-item" href="/report"> Report </a>
        <a class="navbar-item" href="/logout"> Logout [{userEmail}]</a>
      </div>
      <div></div>
    </div>
  </div>
</nav>
