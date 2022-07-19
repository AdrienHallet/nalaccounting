import type { Transaction } from "$lib/logic/model/transaction";
import { DatabaseService } from "../database.service";
import { ArrayState } from "./generic.state";

export class DatabaseFacade {

    private static instance: DatabaseFacade;
    private static dbService: DatabaseService;

    private transactionsHolder: ArrayState<Transaction> | undefined;

    private constructor() {
        // Prevents initialization
    }

    public static async get(): Promise<DatabaseFacade> {
        if (!this.instance) {
            this.instance = new DatabaseFacade();
            this.dbService = await DatabaseService.get();
            // init others
        }
        return this.instance;
    }

    public transactions = async (): Promise<ArrayState<Transaction>> => {
        // Todo Will probably not handle load unless pagination
        if (!this.transactionsHolder) {
            this.transactionsHolder = new ArrayState<Transaction>();
            this.transactionsHolder.replace(await DatabaseFacade.dbService.getTransactions())
        }
        return this.transactionsHolder;
    }
}