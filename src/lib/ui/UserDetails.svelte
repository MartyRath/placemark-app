<script lang="ts">
  export let username = "";
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="label">Name</label>
<div class="field is-horizontal">
  <div class="field-body">
    <div class="field">
      <div class="control has-icons-left">
        <input bind:value={username} class="input" type="text" placeholder="User Name" name="username" />
        <span class="icon is-small is-left">
          <i class="fa fa-id-card"></i>
        </span>
      </div>
    </div>
  </div>
</div>
