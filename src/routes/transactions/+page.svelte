<script>
  import TransactionList from "$lib/ui/transaction/transaction-list.svelte";
  import { isLoading } from "$lib/logic/loading/loading.state";
</script>

{#if $isLoading}
  loading
{:else}
  <TransactionList />
{/if}
