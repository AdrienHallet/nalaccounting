import type { Transaction } from "$lib/logic/model/transaction";
import { TransactionService } from "../service/transaction.service";
import { ArrayState } from "../state/generic.state";

export class TransactionFacade {
    private static instance: TransactionFacade;
    private transactionService: TransactionService;
    private transactionState: ArrayState<Transaction>;
    private lastChange: Date | null;

    private constructor(
        transactionService: TransactionService
    ) {
        this.transactionService = transactionService;
        this.transactionState = new ArrayState<Transaction>();
        this.lastChange = null;
    }

    public static async get() {
        if (!TransactionFacade.instance) {
            const transactionService = await TransactionService.get()
            this.instance = new TransactionFacade(transactionService)
            await this.instance.load();
        }
        return TransactionFacade.instance;
    }

    public getLastChange() {
        return this.lastChange;
    }

    public getStore() {
        return this.transactionState.store
    }

    

    public add(transaction: Transaction) {
        this.transactionService.addOrUpdate(transaction).then(() => {
            this.transactionState.add(transaction);
            this.dirtyData();
        })
    }

    public update(transaction: Transaction) {
        this.transactionService.addOrUpdate(transaction).then(() => {
            this.transactionState.update(transaction);
            this.dirtyData();
        });
    }

    public delete(transaction: Transaction) {
        this.transactionService.delete(transaction).then(() => {
            this.transactionState.delete(transaction);
            this.dirtyData();
        })
    }

    private async load() {
        const transactions = await this.transactionService.getTransactions();
        this.transactionState.init(transactions);
    }
    
    private dirtyData() {
        this.lastChange = new Date();
    }

}