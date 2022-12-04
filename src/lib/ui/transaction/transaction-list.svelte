<script lang="ts">
  import { TransactionFacade } from "$lib/logic/database/facade/transaction.facade";
  import { transactionsState } from "$lib/logic/database/state/transactions.state";
  import type { Transaction, ITransaction } from "$lib/logic/model/transaction";
  import type { Writable } from "svelte/store";
  import Button from "../shared/button.svelte";
  import VirtualScroll from "../shared/virtual/virtual-scroll.svelte";
  import TransactionItem from "./transaction-item.svelte";
  import { TRANSACTIONS_LAYOUT } from "./transactions.consts";

  let transactionFacade: TransactionFacade;
  let transactionVScroll: VirtualScroll;
  let transactions = transactionsState.store;

  const isDbReady = TransactionFacade.get().then(async (facade) => {
    transactionFacade = facade;

  });

  const addTransaction = () => {
     
    const date = new Date();
    const stringDate = date.toISOString().split("T")[0];
    transactionFacade.add({
      date: stringDate,
      title: "",
      amount: "",
    } as unknown as ITransaction);
    if (transactionVScroll.scroller != null && transactionVScroll.slice != null) {
      transactionVScroll.scroller();
      transactionVScroll.slice();
    }   
    
  };
</script>

{#await isDbReady}
  Loading ...
{:then}
  <div class="relative break-words w-full mb-6 rounded text-zinc-200">
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
    <div class="overflow-x-auto px-2 h-[75vh]">
      <VirtualScroll
        bind:this={transactionVScroll}
        items={$transactions}
        classes="min-w-[500px]"
      >
        <div
          class="sticky top-0 overflow-hidden {TRANSACTIONS_LAYOUT} auto-rows-auto bg-zinc-800 border border-x-0"
          slot="header"
        >
          <div class="py-2 text-left">Date</div>
          <div class="py-2 text-left">Amount</div>
          <div class="py-2 text-left">Title</div>
          <div class="py-2 text-left" />
        </div>
        <TransactionItem slot="row" let:item transaction={item} />
      </VirtualScroll>
    </div>
  </div>
{/await}
