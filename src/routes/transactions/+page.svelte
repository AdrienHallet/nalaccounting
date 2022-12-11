<script>
  import TransactionList from "$lib/ui/transaction/transaction-list.svelte";
  import { isLoading } from "$lib/logic/loading/loading.state";
  import { LOADING_COMPONENT } from "$lib/logic/loading/loading.enum";
</script>

{#if $isLoading.get(LOADING_COMPONENT.TRANSACTIONS)}
  loading
{:else}
  <TransactionList />
{/if}
