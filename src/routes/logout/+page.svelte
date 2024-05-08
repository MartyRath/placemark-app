<script lang="ts">
    import { goto } from "$app/navigation";
    import { authHandlers } from "$lib/stores";
    
    const handleLogout = async () => {
      await authHandlers.logout();
      goto("/");
    }

    handleLogout();
  </script>
  