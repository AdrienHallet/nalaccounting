<script>
  import TransactionList from "$lib/ui/transaction/transaction-list.svelte";
  import { isLoading } from "$lib/logic/loading/loading.state";
  import { LOADING_COMPONENT } from "$lib/logic/loading/loading.enum";
  import Loading from "$lib/ui/shared/loading.svelte";
</script>

{#if $isLoading.get(LOADING_COMPONENT.TRANSACTIONS) || $isLoading.get(LOADING_COMPONENT.CATEGORIES)}
<div class="flex flex-grow justify-center h-[200px] align-middle">
  <Loading />  
</div>
{:else}
  <TransactionList />
{/if}
