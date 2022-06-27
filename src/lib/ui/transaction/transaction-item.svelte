<script lang="ts">
import { DatabaseService } from "$lib/logic/database/DatabaseService";

import { Transaction, type ITransaction } from "$lib/logic/model/transaction";

export let transaction: ITransaction;
let originalTransaction: ITransaction = new Transaction(transaction);
let databaseService = DatabaseService.get();

// Update transaction on change
$: if(!originalTransaction.compare(transaction)) {
    databaseService.addOrUpdate(transaction);
}

</script>

<tr>
    <td><span>{transaction.id}</span></td>
    <td>
        <input type="number" 
            bind:value={transaction.amount}/>
    </td>
    <td>
        <input type="text" 
            bind:value={transaction.title}/>
    </td>            
</tr>

