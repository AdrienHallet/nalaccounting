import type { Transaction } from "$lib/logic/model/transaction";
import { DatabaseService } from "../database.service";
import { ArrayState } from "./generic.state";

export class DatabaseFacade {

    private static instance: Promise<DatabaseFacade>;
    private static dbService: DatabaseService;

    private transactionsHolder: ArrayState<Transaction> | undefined;

    private constructor() {
        // Prevents initialization
    }

    public static async get(): Promise<DatabaseFacade> {
        if (!this.instance) {
            this.dbService = await DatabaseService.get();
            this.instance = Promise.resolve(new DatabaseFacade());
            // init others
        }
        return this.instance;
    }

    public transactions = async (): Promise<ArrayState<Transaction>> => {
        // Todo Will probably not handle load unless pagination
        if (!this.transactionsHolder) {
            this.transactionsHolder = new ArrayState<Transaction>();
            this.transactionsHolder.init(await DatabaseFacade.dbService.getTransactions())
        }
        return this.transactionsHolder;
    }
}