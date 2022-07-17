<script>
  import { browser } from "$app/env";

  import { goto } from "$app/navigation";
  import { AuthState } from "$lib/logic/auth/auth.state";
  import TransactionList from "$lib/ui/transaction/transaction-list.svelte";
  import { get } from "svelte/store";

  let loading = true;

  if (browser) {
    if (!get(AuthState.isAuthenticated)) {
      console.log("not auth");
      goto("/login");
    } else {
      console.log("auth");
      loading = false;
    }
  }
</script>

{#if loading} 
  Loading ...
{:else}
  <TransactionList />
{/if}

