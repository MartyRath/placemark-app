<script lang="ts">
  import Message from "$lib/ui/Message.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";
  import { authHandlers } from "$lib/stores";

  let email = "";
  let password = "";
  let message = "";

  async function login() {
    if (!email || !password) {
      message = "Wrong credentials entered";
      return;
    }

    try {
      await authHandlers.login(email, password);
      location.href = "/dashboard";
    } catch (err) {
      console.log("There was an auth error", err);
      message = "Authentication failed";
    }
  }
</script>

{#if message}
  <Message {message} />
{/if}
<form on:submit|preventDefault={login}>
  <UserCredentials bind:email bind:password />
  <button class="button is-success is-fullwidth"> Log In </button>
</form>
