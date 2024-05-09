<script lang="ts">
  import { goto } from "$app/navigation";
  import { authHandlers } from "$lib/stores";
  import Message from "$lib/ui/Message.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";
  import UserDetails from "$lib/ui/UserDetails.svelte";

  let username = "";
  let email = "";
  let password = "";
  let message = "";
  let authenticating = false;

  async function signup() {
    authenticating = true;
    try {
      // Call the signup function from authHandlers. username
      await authHandlers.signup(username, email, password);
      // If signup is successful, navigate to the login page
      goto("/contributorGuide");
    } catch (error) {
      console.error("Error signing up:", error);
      message = "Error trying to sign up";
    } finally {
      authenticating = false;
    }
  }
</script>

{#if message}
  <Message {message} />
{/if}

<form on:submit|preventDefault={signup}>
  <UserDetails bind:username />
  <UserCredentials bind:email bind:password />
  <button class="button is-success is-fullwidth" disabled={authenticating}>
    {authenticating ? "Signing up..." : "Create Account"}
  </button>
</form>
