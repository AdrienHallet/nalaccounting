import type { ITransaction } from "$lib/logic/model/transaction";
import { DexieService } from "../dexie.service";

export const getTransactions = async (): Promise<ITransaction[]> => {
    const result = await 
    DexieService.get().transactions.orderBy('date').reverse().toArray();
    console.log(result);
    return result;
    // Anonymize bout
    // .then((val) => {
    //     return val.map((item) => {
    //         item.amount = Math.floor(Math.random() * 1000);
    //         item.title = "Anonymized";
    //         return item;
    //     });
    // });
}