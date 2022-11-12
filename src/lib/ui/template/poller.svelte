<script lang="ts">
  import { startPolling, stopPolling, type PollingState } from "$lib/logic/database/state/database-syncer";
  import { get, writable } from "svelte/store";

  let isPolling = writable(false);
  let isProcessing = writable(false);
  let isFresh = writable(true);

  let pollingState: PollingState = {
    setPolling: (value) => {
      isPolling.update(() => value);
    },
    setProcessing: (value) => {
      isProcessing.update(() => value);
    },
    setFresh: (value) => {
      isFresh.update(() => value);
    },
  };

  startPolling(pollingState);

  const togglePolling = () => {
    if(get(isPolling)) {
      stopPolling(pollingState);
    } else {
      startPolling(pollingState);
    }
  }

</script>

<div class="flex items-center cursor-pointer" on:click={togglePolling}>
  {#if $isPolling}
    {#if $isProcessing}
      Sending ...
    {/if}
    {#if $isFresh}
      <span class="h-2 w-2 bg-green-600 rounded-full align-middle" />
    {:else}
      <span class="h-2 w-2 bg-orange-600 rounded-full align-middle" />
    {/if}
  {:else}
    <span class="h-2 w-2 bg-red-600 rounded-full align-middle" />
  {/if}
</div>
