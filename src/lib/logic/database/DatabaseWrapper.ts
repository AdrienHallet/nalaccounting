import Dexie from "dexie";
import type { ITransaction } from "../model/transaction";

export class DatabaseWrapper extends Dexie {
    transactions!: Dexie.Table<ITransaction, number>;

    constructor() {
        super("budjet");

        this.version(1).stores({
            transactions: '++id, amount, title',
        });
    }
}