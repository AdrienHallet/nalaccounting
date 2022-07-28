<script lang="ts" context="module">
  let editedTransaction: any = () => {};
</script>

<script lang="ts">
  import { DatabaseFacade } from "$lib/logic/database/state/database.facade";
  import type { ArrayState } from "$lib/logic/database/state/generic.state";
  import { Transaction, type ITransaction } from "$lib/logic/model/transaction";

  export let transaction: ITransaction;
  let originalTransaction: ITransaction = new Transaction(transaction);
  let isEditing: boolean;

  let transactions: ArrayState<Transaction>;

  DatabaseFacade.get().then(async (facade) => {
    await facade.transactions().then((state) => {
      transactions = state;
    });
  });

  // Update transaction on change
  $: if (!originalTransaction.compare(transaction)) {
    transactions.update(transaction);
    originalTransaction = new Transaction(transaction);
  }

  const handleClick = () => {
    editedTransaction();
    editedTransaction = () => {
      isEditing = false;
    };
    isEditing = true;
  };

  const onClickRemove = () => {
    transactions.delete(transaction);
  };

  const editingClasses = "border-2 border-gray-100 bg-zinc-600";
</script>

<tr class={isEditing ? editingClasses : ""} on:click={handleClick}>
  {#if isEditing}
    <td class="w-2/12">
      <input class="bg-zinc-700" type="date" bind:value={transaction.date} />
    </td>
    <td class="w-5/12">
      <input class="bg-zinc-700" bind:value={transaction.title} />
    </td>
    <td class="w-2/12">
      <input class="bg-zinc-700" bind:value={transaction.amount} />
    </td>
  {:else}
    <td class="w-2/12"> {transaction.date} </td>
    <td class="w-7/12">
      {transaction.title}
    </td>
    <td class="w-2/12">
      {transaction.amount ?? "N/A"}
    </td>
  {/if}
  <td class="w-1/12 text-center">
    <svg
      on:click={onClickRemove}
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
  </td>
</tr>
