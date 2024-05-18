<script lang="ts">
  import { authHandlers } from "$lib/stores";

  export const handleLogout = async () => {
    await authHandlers.logout();
    location.href = "/";
  };

  handleLogout();
</script>
