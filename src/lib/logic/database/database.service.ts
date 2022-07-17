import { liveQuery, type Observable } from "dexie";
import type { ITransaction } from "../model/transaction";
import databaseLoader from "./database-loader";
import { DexieService } from "./dexie.service";

/**
 * Handles database communications.
 */
export class DatabaseService {
    private static instance: DatabaseService;

    public db: DexieService;

    private constructor() {
        console.log("Creating DB service");
        this.db = new DexieService();
    }

    public static async get(): Promise<DatabaseService> {
        if(!DatabaseService.instance) {
            await databaseLoader();
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }

    public getTransactions(): Observable<ITransaction[]> {
        return liveQuery(async () =>{
            return await this.db.transactions?.toArray();
        });
    }

    public addTransaction(): void {
        this.db.transactions.add(<ITransaction>{ title: 'dynamic'})
    }

    public addOrUpdate(transaction: ITransaction) {
        if (transaction.id) {
            this.db.transactions.update(transaction.id, transaction);
        } else {
            this.db.transactions.add(transaction);
        }
    }
}