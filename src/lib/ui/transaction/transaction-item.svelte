<script lang="ts" context="module">
  let editedTransaction: any = () => {};
</script>

<script lang="ts">
  import { DatabaseService } from "$lib/logic/database/database.service";
  import { Transaction, type ITransaction } from "$lib/logic/model/transaction";

  export let transaction: ITransaction;
  let originalTransaction: ITransaction = new Transaction(transaction);
  let databaseService: DatabaseService;
  let isEditing: boolean;
  DatabaseService.get().then(
    (service) => (databaseService = service)
  );

  // Update transaction on change
  $: if (!originalTransaction.compare(transaction)) {
    databaseService.addOrUpdate(transaction);
  }

  const handleClick = () => {
    editedTransaction();
    editedTransaction = () => (isEditing = false);
    isEditing = true;
  };
</script>

{#if isEditing}
  <tr class="border-2 border-gray-100 bg-zinc-600">
    <td class="w-2/12">
      <input class="bg-zinc-700" type="date" bind:value={transaction.date} />
    </td>
    <td class="w-5/12">
      <input class="bg-zinc-700" bind:value={transaction.title} />
    </td>
    <td class="w-2/12">
      <input class="bg-zinc-700" bind:value={transaction.amount} />
    </td>
  </tr>
{:else}
  <tr on:click={handleClick}>
    <td class="w-2/12"> {transaction.date} </td>
    <td class="w-5/12">
      {transaction.title}
    </td>
    <td class="w-2/12">
      {transaction.amount ?? "N/A"}
    </td>
  </tr>
{/if}
