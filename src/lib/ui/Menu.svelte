<script lang="ts">
  import { authStore } from "$lib/stores";
  import { onMount } from "svelte";

  let username = "";

  // Get user name on component mount
  onMount(() => {
    const unsubscribe = authStore.subscribe((value) => {
      if (value.user) {
        username = value.user.displayName;
      }
    });
    return unsubscribe;
  });

  function reloadPage(event) {
    // Prevent default navigation behavior
    event.preventDefault();
    // Force a reload of the current page
    location.reload(); // Alternatively clear caches: caches.delete("/maps");
    window.location.href = "/maps";
  }

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
        <a class="navbar-item" href="/addTree"> Your Trees </a>
        <a class="navbar-item" href="/report"> Report </a>
        <a class="navbar-item" href="/charts"> Charts </a>
        <a class="navbar-item" href="/maps" on:click="{reloadPage}"> Maps </a>
        <a class="navbar-item" href="/logout"> Logout [{username}]</a>
      </div>
      <div></div>
    </div>
  </div>
</nav>
