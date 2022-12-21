<script lang="ts">
  import { onMount } from "svelte";
  import { Chart, registerables, type ChartItem } from "chart.js";
  import type { Readable } from "svelte/store";
  import { browser } from "$app/environment";

  export let data: Readable<any[]>;
  export let config: (data: any[]) => {};
  export let title: string;
  export let maxWidth: string;
  let isReady = false;
  let chart: Chart;
  let canvas: ChartItem;

  $: $data, loadData();

  // init chart
  onMount(async () => {
    Chart.register(...registerables);
    isReady = true;
    loadData();
  });

  const loadData = () => {
    if (!browser || !isReady) {
      return;
    }
    if (chart) {
      chart.destroy();
    }
    chart = new Chart(canvas, config($data) as any);
  };
</script>

<h2 class="text-white text-xl font-semibold">{title}</h2>

<canvas width="100%" height="100%" bind:this={canvas} />
