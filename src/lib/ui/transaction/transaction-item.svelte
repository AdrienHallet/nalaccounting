<script lang="ts" context="module">
  let editedTransaction: any = () => {};
</script>

<script lang="ts">
  import { Transaction, type ITransaction } from "$lib/logic/model/transaction";
  import { TRANSACTIONS_LAYOUT } from "./transactions.consts";
  import { deleteTransaction, updateTransaction } from "$lib/logic/database/transaction/operations";
  import { categories } from "$lib/logic/database/category/categories.state";

  export let transaction: ITransaction;
  let originalTransaction: ITransaction = new Transaction(transaction);
  let isEditing: boolean;
  let displayValue: string = ((transaction.amount || 0) / 100).toFixed(2);

  const update = () => {
    if (!originalTransaction.equals(transaction)) {
      updateTransaction(transaction);
      originalTransaction = new Transaction(transaction);
    }
  };

  $: transaction, transactionChange();
  const transactionChange = () => {
    if (transaction.id != originalTransaction.id) {
      originalTransaction = new Transaction(transaction);
      displayValue = ((transaction.amount || 0) / 100).toFixed(2);
    } else {
      update()
    }
  }

  let initialized = false;

  const updateAmount = () => {
    if (initialized) {
      transaction.amount = Math.round(parseFloat(displayValue) * 100);
      update();
    } else {
      initialized = true;
    }
  };

  const setEditing = () => {
    editedTransaction();
    editedTransaction = () => {
      isEditing = false;
    };
    isEditing = true;
  };

  const onClickRemove = () => {
    deleteTransaction(transaction);
  };

  const editingClasses = `border-2 border-gray-100 bg-zinc-600 ${TRANSACTIONS_LAYOUT}`;
</script>

<span
  class={isEditing ? editingClasses : `${TRANSACTIONS_LAYOUT}`}
  on:click={setEditing}
  on:keydown={setEditing}
>
  <div class="w-full">
    <input
      class="bg-transparent w-full"
      type="date"
      bind:value={transaction.date}
      readonly={!isEditing}
      on:focus={setEditing}
    />
  </div>
  <div class="w-full">
    <input
      class="hidden"
      bind:value={transaction.amount}
      step="any"
      type="number"
      readonly={!isEditing}
      on:focus={setEditing}
    />
    <input
      class="bg-transparent w-full text-right"
      bind:value={displayValue}
      step="any"
      type="number"
      readonly={!isEditing}
      on:focus={setEditing}
      on:focusout={(event) => event.currentTarget.value = parseFloat(event.currentTarget.value).toFixed(2)}
      on:input={updateAmount}
    />
  </div>
  <div>
    <select
      class="bg-transparent w-full"
      bind:value={transaction.categoryId}
    >
      <option class="bg-zinc-600"></option>
      {#each $categories as category}
        <option 
        class="bg-zinc-600"
        value={category.id}>{category.name}</option>
      {/each}
    </select>
  </div>
  <div class="">
    <input
      class="bg-transparent w-full text-ellipsis"
      bind:value={transaction.title}
      readonly={!isEditing}
      on:focus={setEditing}
    />
  </div>
  <div class="text-center">
    <svg
      on:click={onClickRemove}
      on:keydown={onClickRemove}
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 inline-block cursor-pointer"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  </div>
</span>
