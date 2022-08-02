<script lang="ts">
  import { TransactionFacade } from "$lib/logic/database/facade/transaction.facade";
  import type { Transaction, ITransaction } from "$lib/logic/model/transaction";
  import type { Writable } from "svelte/store";
  import Button from "../shared/button.svelte";
  import TransactionItem from "./transaction-item.svelte";

  let transactionFacade: TransactionFacade;
  let transactions: Writable<Transaction[]>;

  const isDbReady = TransactionFacade.get().then(async (facade) => {
    transactionFacade = facade;
    transactions = facade.getStore();
    await facade.load();
  });

  const addTransaction = () => {
    const date = new Date();
    const stringDate = date.toISOString().split("T")[0];
    transactionFacade.add({
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
            <th class="py-2 border border-x-0 text-left"> Amount </th>
            <th class="py-2 border border-x-0 text-left"> Title </th>
            <th class="py-2 border border-x-0 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {#each $transactions as transaction}
            <TransactionItem {transaction} />
          {/each}
        </tbody>
      </table>
    </div>
  </div>
{/await}
