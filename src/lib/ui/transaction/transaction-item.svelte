<script lang="ts" context="module">
  let editedTransaction: any = () => {};
</script>

<script lang="ts">
  import { Transaction, type ITransaction } from "$lib/logic/model/transaction";
  import { TransactionFacade } from "$lib/logic/database/facade/transaction.facade";

  export let transaction: ITransaction;
  let transactionFacade: TransactionFacade;
  let originalTransaction: ITransaction = new Transaction(transaction);
  let isEditing: boolean;

  TransactionFacade.get().then(async (facade) => {
    transactionFacade = facade;
  });

  // Update transaction on change
  $: if (!originalTransaction.compare(transaction)) {
    transactionFacade.update(transaction);
    originalTransaction = new Transaction(transaction);
  }

  const setEditing = () => {
    editedTransaction();
    editedTransaction = () => {
      isEditing = false;
    };
    isEditing = true;
  };

  const onClickRemove = () => {
    transactionFacade.delete(transaction);
  };

  const editingClasses = "border-2 border-gray-100 bg-zinc-600";
</script>

<tr class={isEditing ? editingClasses : ""} on:click={setEditing}>
  <td class="w-2/12">
    <input
      class="bg-zinc-700"
      type="date"
      bind:value={transaction.date}
      readonly={!isEditing}
      on:focus={setEditing}
    />
  </td>
  <td class="w-2/12">
    <input
      class="bg-zinc-700"
      bind:value={transaction.amount}
      type="number"
      readonly={!isEditing}
      on:focus={setEditing}
    />
  </td>
  <td class="w-7/12">
    <input
      class="bg-zinc-700 w-full text-ellipsis"
      bind:value={transaction.title}
      readonly={!isEditing}
      on:focus={setEditing}
    />
  </td>
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
