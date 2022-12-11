<script>
  import TransactionList from "$lib/ui/transaction/transaction-list.svelte";
  import { isLoading } from "$lib/logic/loading/loading.state";
  import { LOADING_COMPONENT } from "$lib/logic/loading/loading.enum";
  import { DexieService } from "$lib/logic/database/dexie.service";
</script>

{#if $isLoading.get(LOADING_COMPONENT.TRANSACTIONS)}
  loading
  {DexieService.get()}
{:else}
  <TransactionList />
{/if}
