<script lang="ts">
  import databaseExporter from "$lib/logic/database/database-exporter";
  import { transactionsChange } from "$lib/logic/database/transaction/transactions.state";
  import ArrowUp from "../shared/icon/arrow-up.svelte";

  let isPolling = true;
  let isProcessing = false;
  let isFresh = true;

  $: $transactionsChange, onTransactionsChange();

  const onTransactionsChange = () => {
    if ($transactionsChange) {
      processChanges();
    }
  }

  let exportTimeout: NodeJS.Timer;
  const processChanges = () => {
    isFresh = false;
    if (exportTimeout) {
      clearInterval(exportTimeout);
    }
    exportTimeout = setInterval(exportDatabase, 10000);
  }

  const exportDatabase =async () => {
    isProcessing = true;
    await databaseExporter();
    isProcessing = false;
    isFresh = true;
    clearInterval(exportTimeout);
  }

  const togglePolling = () => {
    isPolling = false;
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
