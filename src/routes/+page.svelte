<script>
  import { loading } from "$lib/logic/loading/loading.state";
  import Dashboard from "$lib/ui/dashboard/dashboard.svelte";
</script>

{#if $loading}
  loading...
{:else}
  <Dashboard />
{/if}
