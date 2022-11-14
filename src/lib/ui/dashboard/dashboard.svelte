<script lang="ts">
  import { onMount } from "svelte";
  // library that creates chart objects in page
  import { TransactionFacade } from "$lib/logic/database/facade/transaction.facade";
  import type { Transaction } from "$lib/logic/model/transaction";
  import { type Writable, get, type Readable } from "svelte/store";
  import { BalanceFacade } from "$lib/logic/database/facade/balance.facade";
  import type { Balance } from "$lib/logic/model/balance";
  import { Chart } from "chart.js";

  let transactions: Readable<Balance[]>;

  const isDbReady = BalanceFacade.get().then(async (facade) => {
    transactions = facade.dailyState;
  });

  // init chart
  onMount(async () => {
    await isDbReady;
    var config = {
      type: 'line',
      data: {
        datasets: [
          {
            data: get(transactions),
          },
        ],
      },
      options: {
        parsing: {
          xAxisKey: 'date',
          yAxisKey: 'amount',
        },
      },
    };
    const ctx = 'line-chart';
    const chart = new Chart(ctx, config as any);
  });
</script>

<div
  class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700"
>
  <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
    <div class="flex flex-wrap items-center">
      <div class="relative w-full max-w-full flex-grow flex-1">
        <h6 class="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
          Overview
        </h6>
        <h2 class="text-white text-xl font-semibold">Sales value</h2>
      </div>
    </div>
  </div>
  <div class="p-4 flex-auto">
    <!-- Chart -->
    <div class="relative h-350-px">
      <canvas id="line-chart" />
    </div>
  </div>
</div>
