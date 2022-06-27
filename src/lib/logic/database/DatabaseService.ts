import { liveQuery, type Observable } from "dexie";
import type { ITransaction } from "../model/transaction";
import { DatabaseWrapper } from "./DatabaseWrapper";

/**
 * Handles database communications.
 */
export class DatabaseService {
    private static instance: DatabaseService;

    private db: DatabaseWrapper;

    private constructor() {
        this.db = new DatabaseWrapper();
    }

    public static get(): DatabaseService {
        if(!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }

    public getTransactions(): Observable<ITransaction[]> {
        return liveQuery(async () =>{
            return await this.db.transactions?.toArray();
        });
    }

    addTransaction(): void {
        this.db.transactions.add(<ITransaction>{ title: 'dynamic'})
    }

    addOrUpdate(transaction: ITransaction) {
        if (transaction.id) {
            this.db.transactions.update(transaction.id, transaction);
        } else {
            this.db.transactions.add(transaction);
        }
    }
}