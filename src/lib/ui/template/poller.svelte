<script lang="ts">
  import { startPolling } from "$lib/logic/database/state/database-syncer";
  import { writable } from "svelte/store";

  let isPolling = writable(false);
  let isProcessing = writable(false);
  let isFresh = writable(true);

  startPolling({
    setPolling: (value) => {
      isPolling.update(() => value);
    },
    setProcessing: (value) => {
      isProcessing.update(() => value);
    },
    setFresh: (value) => {
      isFresh.update(() => value);
    }
  });
</script>
<div class="flex items-center">
  {#if $isPolling}
    {#if $isProcessing}
      Sending ...
    {/if}
    {#if $isFresh}
      <span class="h-2 w-2 bg-green-600 rounded-full align-middle"></span>
    {:else}
      <span class="h-2 w-2 bg-orange-600 rounded-full align-middle"></span>
    {/if}
  {:else}
    <span class="h-2 w-2 bg-red-600 rounded-full align-middle"></span>
  {/if}
</div>

