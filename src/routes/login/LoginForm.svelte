<script lang="ts">
  import { goto } from "$app/navigation";
  import { currentSession } from "$lib/stores";
  import Message from "$lib/ui/Message.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";

  let email = "";
  let password = "";
  let message = "";

  function login(){
    if (!email || !password) {
    message = "Wrong credentials entered";
    return;
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
  