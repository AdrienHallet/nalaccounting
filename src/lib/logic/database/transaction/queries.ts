import type { ITransaction, Transaction } from "$lib/logic/model/transaction";
import { DexieService } from "../dexie.service";

export const getDBTransactions = async (): Promise<ITransaction[]> => {
    const result = await DexieService.get().transactions.orderBy('date').reverse().toArray();
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

export const addDBTransaction = async (toAdd: Transaction): Promise<number> => {
    const result = await DexieService.get().transactions.add(toAdd);
    return result;
}

export const updateDBTransaction = async (toUpdate: Transaction): Promise<number> => {
    if (toUpdate.id == null) {
        throw Error('Unexpected empty id');
    }
    const result = await DexieService.get().transactions.update(toUpdate.id, toUpdate);
    return result;
}

export const deleteDBTransaction = async (toDelete: Transaction): Promise<void> => {
    if (toDelete.id == null) {
        throw Error('Unexpected empty id');
    }
    const result = await DexieService.get().transactions.delete(toDelete.id);
    return result;
}