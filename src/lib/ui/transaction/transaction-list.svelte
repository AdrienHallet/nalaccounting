<script lang="ts">
  import { DatabaseService } from "$lib/logic/database/database.service";
  import type { Transaction, ITransaction } from "$lib/logic/model/transaction";
  import type { Subscription } from "dexie";
  import { onDestroy } from "svelte";
  import Button from "../shared/button.svelte";
  import TransactionItem from "./transaction-item.svelte";

  let dbService: DatabaseService;
  let transactions: Transaction[] = [];
  let subscription: Subscription;

  const isDbReady = DatabaseService.get();

  isDbReady.then((service) => {
    dbService = service;
    subscription = dbService.getTransactions().subscribe((next) => {
      console.debug("transactions updated");
      transactions = next;
    });
  });

  onDestroy(() => {
    subscription?.unsubscribe();
  });

  const addTransaction = () => {
    const date = new Date();
    const stringDate = date.getFullYear() + '-' + (date.getMonth()+1 < 10 ? '0' : '') + (date.getMonth()+1) + '-' + date.getDate();
    dbService.addOrUpdate({
      date: stringDate,
      title: '',
      amount: '',
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
    <div class="block w-full overflow-x-auto">
      <!-- Projects table -->
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th class="py-2 border border-x-0 text-left"> Date </th>
            <th class="py-2 border border-x-0 text-left"> Title </th>
            <th class="py-2 border border-x-0 text-left"> Amount </th>
          </tr>
        </thead>
        <tbody>
          {#each transactions as transaction}
            <TransactionItem {transaction} />
          {/each}
        </tbody>
      </table>
    </div>
  </div>
{/await}
