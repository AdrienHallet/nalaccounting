<script>
  import TransactionList from "$lib/ui/transaction/transaction-list.svelte";
  import { loading } from "$lib/logic/loading/loading.state";
</script>

{#if $loading}
  loading
{:else}
  <TransactionList />
{/if}
