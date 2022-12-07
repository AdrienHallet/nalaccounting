import type { Transaction } from "$lib/logic/model/transaction";
import { TransactionService } from "../service/transaction.service";
import { transactionsState } from "../state/transactions.state";

export class TransactionFacade {

    private static instance: TransactionFacade;

    private transactionService: TransactionService;
    
    private lastChange: Date | null;

    private constructor(
        transactionService: TransactionService
    ) {
        this.transactionService = transactionService;
        this.lastChange = null;
    }

    public static get() {
        if (!TransactionFacade.instance) {
            const transactionService = TransactionService.get()
            this.instance = new TransactionFacade(transactionService)
            this.instance.load();
        }
        return TransactionFacade.instance;
    }

    public getLastChange() {
        return this.lastChange;
    }

    public add(transaction: Transaction) {
        this.transactionService.addOrUpdate(transaction).then(() => {
            transactionsState.prepend(transaction);
            this.dirtyData();
        })
    }

    public update(transaction: Transaction) {
        this.transactionService.addOrUpdate(transaction).then(() => {
            transactionsState.update(transaction);
            this.dirtyData();
        });
    }

    public delete(transaction: Transaction) {
        this.transactionService.delete(transaction).then(() => {
            transactionsState.delete(transaction);
            this.dirtyData();
        })
    }

    private async load() {
        try {
            const transactions = await this.transactionService.getTransactions();
            transactionsState.init(transactions);
        } catch (error) {
            console.error(error);
        }
        
    }
    
    private dirtyData() {
        this.lastChange = new Date();
    }

}