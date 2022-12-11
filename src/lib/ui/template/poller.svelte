<script lang="ts">
  import { transactions, transactionsPristine } from "$lib/logic/database/transaction/transactions.state";
  import { isLoading } from "$lib/logic/loading/loading.state";
  import ArrowUp from "../shared/icon/arrow-up.svelte";

  let isPolling = false;
  let isProcessing = false;
  let isFresh = true;

  $: $transactions, onDataChange();

  const onDataChange = () => {
    if ($transactionsPristine) {
      // Do not do anything when it's pristine
      return;
    }
  }

  const togglePolling = () => {
    console.error('not implemented');
  }


  
</script>
<div class="flex items-center cursor-pointer w-6 justify-center hover:border border-zinc-600 rounded-sm" on:click={togglePolling}>
  {#if isPolling}
    {#if isProcessing}
      <div class="text-orange-600 animate-bounce">
        <ArrowUp />
      </div>
    {:else if isFresh}
      <span class="h-2 w-2 bg-green-600 rounded-full" />
    {:else}
      <span class="h-2 w-2 bg-orange-600 rounded-full" />
    {/if}
  {:else}
    <span class="h-2 w-2 bg-red-600 rounded-full align-middle" />
  {/if}
</div>
