<script lang="ts">
  import { transactions } from "$lib/logic/database/transaction/transactions.state";
  import { addTransaction } from "$lib/logic/database/transaction/operations";
  import type { ITransaction } from "$lib/logic/model/transaction";
  import Button from "../shared/button.svelte";
  import VirtualScroll from "../shared/virtual/virtual-scroll.svelte";
  import TransactionItem from "./transaction-item.svelte";
  import { TRANSACTIONS_LAYOUT } from "./transactions.consts";
  import { Type } from "../shared/enums";

  let transactionVScroll: VirtualScroll;

  const add = () => {
    const date = new Date();
    const stringDate = date.toISOString().split("T")[0];
    addTransaction({
      date: stringDate,
      title: "",
      amount: "",
    } as unknown as ITransaction);
    if (
      transactionVScroll.scroller != null &&
      transactionVScroll.slice != null
    ) {
      transactionVScroll.scroller();
      transactionVScroll.slice();
    }
  };
</script>

<div class="relative break-words w-full mb-6 rounded text-zinc-200">
  <div class="rounded-t mb-0 px-4 py-3 border-0">
    <div class="flex flex-wrap items-center">
      <div class="relative w-full px-4 max-w-full flex-grow flex-1">
        <h3 class="font-semibold text-lg">Transactions</h3>
      </div>
      <div>
        <Button type={Type.PRIMARY} on:click={add}>+ Add</Button>
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
        <div class="py-2 text-left">Category</div>
        <div class="py-2 text-left">Title</div>
        <div class="py-2 text-left" />
      </div>
      <TransactionItem slot="row" let:item transaction={item} />
    </VirtualScroll>
  </div>
</div>
