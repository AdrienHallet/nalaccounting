<script lang="ts">
  import { browser } from "$app/environment";
  import {
    startPolling,
    stopPolling,
    type PollingState,
  } from "$lib/logic/database/state/database-syncer";
  import { onDestroy } from "svelte";
  import { get, writable } from "svelte/store";
  import ArrowUp from "../shared/icon/arrow-up.svelte";

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

  if (browser) {
    startPolling(pollingState);
    onDestroy(() => {stopPolling(pollingState)})
  }
  

  const togglePolling = () => {
    if (get(isPolling)) {
      stopPolling(pollingState);
    } else {
      startPolling(pollingState);
    }
  };
</script>
<div class="flex items-center cursor-pointer w-6 justify-center hover:border border-zinc-600 rounded-sm" on:click={togglePolling}>
  {#if $isPolling}
    {#if $isProcessing}
      <div class="text-orange-600 animate-bounce">
        <ArrowUp />
      </div>
    {:else if $isFresh}
      <span class="h-2 w-2 bg-green-600 rounded-full" />
    {:else}
      <span class="h-2 w-2 bg-orange-600 rounded-full" />
    {/if}
  {:else}
    <span class="h-2 w-2 bg-red-600 rounded-full align-middle" />
  {/if}
</div>
