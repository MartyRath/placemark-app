<script lang="ts">
  import { goto } from "$app/navigation";
  import { currentSession } from "$lib/stores";
  import Message from "$lib/ui/Message.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";

  let email = "";
  let password = "";
  let message = "";

  async function login() {
    // No Auth in place yet so set to true for now
    const success = true;
    if (success) {
      currentSession.set(email);
      goto("/addTree");
    } else {
      email = "";
      password = "";
      message = "Invalid Credentials";
    }
  }
</script>
  
  {#if message}
    <Message {message} />
  {/if}
  <!-- This is an HTML comment  Triggers login function above -->
  <form on:submit|preventDefault={login}>
    <UserCredentials bind:email bind:password />
    <button class="button is-success is-fullwidth">Log In</button>
  </form>
  