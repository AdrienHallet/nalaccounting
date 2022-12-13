<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { BalanceFacade } from "$lib/logic/database/facade/balance.facade";
  import type { Balance } from "$lib/logic/model/balance";
  import { Chart, registerables, type ChartItem } from "chart.js";
  import { balanceConfig } from "./balance-config";
  import type { Readable } from "svelte/store";
  import { browser } from "$app/environment";

  let balance: Readable<Balance[]> = BalanceFacade.get().dailyState;
  let isReady = false;
  let chart: Chart;
  let canvas: ChartItem;

  $: $balance, loadBalance();

  // init chart
  onMount(async () => {
    Chart.register(...registerables);
    isReady = true;
    loadBalance();
  });

  const loadBalance = () => {
    if (!browser || !isReady) {
      return;
    }
    if (chart) {
      chart.destroy()
    }
    chart = new Chart(canvas, balanceConfig($balance) as any);
  }
</script>

<h2 class="text-white text-xl font-semibold">Balance</h2>
<div class="p-4 flex-auto">
  <!-- Chart -->
  <div class="relative">
    <canvas bind:this={canvas} id="balance-chart" />
  </div>
</div>
