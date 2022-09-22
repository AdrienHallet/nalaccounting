<script>
  import { browser } from "$app/environment";

  import { goto } from "$app/navigation";
  import { AuthState } from "$lib/logic/auth/auth.state";
  import { AuthService } from "$lib/logic/auth/auth.service";
  import TransactionList from "$lib/ui/transaction/transaction-list.svelte";
  import { get } from "svelte/store";

  let loading = true;

  

  if (browser) {
    const onSuccessfulAuthentication = () => {
      loading = false;
    }

    if (!get(AuthState.isAuthenticated)) {
      AuthService.get().tryLocalAuthentication().then((token) => {
        if (token) {
          onSuccessfulAuthentication();
        } else {
          goto("/login");
        }
      });
    } else {
      onSuccessfulAuthentication();
    }
  }
</script>

{#if loading} 
  Loading ...
{:else}
  <TransactionList />
{/if}

