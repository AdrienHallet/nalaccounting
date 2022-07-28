<script lang="ts">
  import { DatabaseFacade } from "$lib/logic/database/state/database.facade";
  import type { ArrayState } from "$lib/logic/database/state/generic.state";
  import type { Transaction, ITransaction } from "$lib/logic/model/transaction";
  import type { Subscription } from "dexie";
  import { onDestroy } from "svelte";
  import type { Unsubscriber, Writable } from "svelte/store";
  import Button from "../shared/button.svelte";
  import TransactionItem from "./transaction-item.svelte";

  let transactions: ArrayState<Transaction>;
  let transactionsStore: Writable<Transaction[]>;

  const isDbReady = DatabaseFacade.get().then(async (facade) => {
    await facade.transactions().then((state) => {
      transactions = state;
      transactionsStore = state.store;
    });
  });

  const addTransaction = () => {
    const date = new Date();
    const stringDate =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1 < 10 ? "0" : "") +
      (date.getMonth() + 1) +
      "-" +
      date.getDate();
    transactions.add({
      date: stringDate,
      title: "",
      amount: "",
    } as unknown as ITransaction);
  };
</script>

{#await isDbReady}
  Loading ...
{:then}
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-zinc-700 text-zinc-200"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-lg">Transactions</h3>
        </div>
        <div>
          <Button primary on:click={addTransaction}>+ Add</Button>
        </div>
      </div>
    </div>
    <div class="block w-full overflow-x-auto px-2">
      <!-- Projects table -->
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th class="py-2 border border-x-0 text-left"> Date </th>
            <th class="py-2 border border-x-0 text-left"> Title </th>
            <th class="py-2 border border-x-0 text-left"> Amount </th>
            <th class="py-2 border border-x-0 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {#each $transactionsStore as transaction}
            <TransactionItem {transaction} />
          {/each}
        </tbody>
      </table>
    </div>
  </div>
{/await}
