<script lang="ts">
  import { onMount } from "svelte";
  import { get, type Readable } from "svelte/store";
  import { BalanceFacade } from "$lib/logic/database/facade/balance.facade";
  import type { Balance } from "$lib/logic/model/balance";
  import { Chart, registerables } from "chart.js";
  import { browser } from "$app/environment";
  import { redirect } from "@sveltejs/kit";
  import colors from 'tailwindcss/colors';

  let balance: Readable<Balance[]>;
  let isDbReady: Promise<boolean | void>;
  if (browser) {
    isDbReady = BalanceFacade.get().then(async (facade) => {
      balance = facade.dailyState;
    });
  }

  // init chart
  onMount(async () => {
    Chart.register(...registerables);
    await isDbReady;
    var config = {
      type: "line",
      data: {
        datasets: [
          {
            data: get(balance),
            backgroundColor: colors.zinc[300],
            borderColor: colors.zinc[600],
          },
        ],
      },
      options: {
        parsing: {
          xAxisKey: "date",
          yAxisKey: "amount",
        },
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                position: 'right',
                grid: {
                    color: colors.zinc[700],
                }
            },
            x: {
                grid: {
                    display: false,
                }
            }
        }
      },
    };
    const ctx = "line-chart";
    const chart = new Chart(ctx, config as any);
  });
</script>

<h2 class="text-white text-xl font-semibold">Balance</h2>
<div class="p-4 flex-auto">
  <!-- Chart -->
  <div class="relative">
    <canvas id="line-chart" />
  </div>
</div>
