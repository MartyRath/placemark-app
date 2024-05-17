<script lang="ts">
  import { goto } from "$app/navigation";
  import Message from "$lib/ui/Message.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";
  import { authHandlers } from "$lib/stores";

  let email = "";
  let password = "";
  let message = "";
  let authenticating = false;

  async function login(){
    authenticating = true;
    if (!email || !password) {
    message = "Wrong credentials entered";
    return;
    }

    try {
        await authHandlers.login(email, password);
        goto("/dashboard");
      } catch (err) {
        console.log("There was an auth error", err);
        message = "Authentication failed";
      } finally {
        authenticating = false;
      }
    }
</script>
  
  {#if message}
    <Message {message} />
  {/if}
  <!-- This is an HTML comment  Triggers login function above -->
  <form on:submit|preventDefault={login}>
    <UserCredentials bind:email bind:password />
    <button class="button is-success is-fullwidth">
      Log In
    </button>
  </form>
  