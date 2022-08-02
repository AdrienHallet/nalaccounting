import type { ITransaction, } from "$lib/logic/model/transaction";
import { liveQuery, type Observable } from "dexie";
import databaseLoader from "../database-loader";
import { DexieService } from "../dexie.service";

export class TransactionService {
    private static instance: Promise<TransactionService>;

    public db: DexieService;

    private constructor() {
        console.log("Creating DB service");
        this.db = DexieService.get();
    }

    public static async get(): Promise<TransactionService> {
        if(!TransactionService.instance) {
            await databaseLoader();
            TransactionService.instance = Promise.resolve(new TransactionService());
        }
        return TransactionService.instance;
    }

    public getLiveTransactions(): Observable<ITransaction[]> {
        return liveQuery(async () =>{
            return await this.db.transactions?.toArray();
        });
    }

    public async getTransactions(): Promise<ITransaction[]> {
        return await this.db.transactions.toArray();
    }

    public addTransaction(): void {
        this.db.transactions.add(<ITransaction>{ title: 'dynamic'})
    }

    public addOrUpdate(transaction: ITransaction) {
        if (transaction.id) {
            return this.db.transactions.update(transaction.id, transaction);
        } else {
            return this.db.transactions.add(transaction);
        }
    }

    public delete(transaction: ITransaction) {
        if (!transaction.id) {
            throw new Error("Cannot delete transaction without an ID");
        }
        return this.db.transactions.delete(transaction.id);
    }
}