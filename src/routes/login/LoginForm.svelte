<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData, SubmitFunction } from "./$types";

  export let form: ActionData;

  let email = "";
  let password = "";

  const submitLogin: SubmitFunction = () => {
    return async ({ result, update }) => {
      switch (result.type) {
        case "success":
          await update();
          break;
        case "failure":
          await update();
          break;
        case "error":
          console.error("An error occurred:", result.error);
          break;
        default:
          await update();
      }
    };
  };
</script>

{#if form?.message}
  <p class="error">{form.message}</p>
{/if}

<form method="POST" action="?/login" use:enhance={submitLogin}>
  <label>
    Email
    <input type="email" name="email" bind:value={email} required />
  </label>
  <label>
    Password
    <input type="password" name="password" bind:value={password} required />
  </label>
  <button type="submit">Log In</button>
</form>