<script lang="ts">
import { DatabaseService } from "$lib/logic/database/DatabaseService";
import type { Transaction } from "$lib/logic/model/transaction";
import { onDestroy } from "svelte";
import TransactionItem from "./transaction-item.svelte";

const dbService = DatabaseService.get();
let transactions: Transaction[];
const subsription = dbService.getTransactions().subscribe((next) => {
    console.debug("transactions updated");
    transactions = next;
});

onDestroy(() => {
    subsription.unsubscribe();
});

</script>

<button on:click="{() => dbService.addTransaction()}">add</button>
test
<br>
{#if transactions }
    <table>
        <tr>
            <th>id</th>
            <th>amount</th>
            <th>title</th>
        </tr>
        {#each transactions as transaction}
            <TransactionItem transaction={transaction}></TransactionItem>
        {/each}
    </table>
    
{/if}
