import type { Transaction } from "$lib/logic/model/transaction";
import { AsyncLock } from "$lib/logic/utils/async-lock";
import { TransactionService } from "../service/transaction.service";
import { transactionsState } from "../state/transactions.state";

export class TransactionFacade {

    private static instance: TransactionFacade;
    private static lock = new AsyncLock();

    private transactionService: TransactionService;
    
    private lastChange: Date | null;

    private constructor(
        transactionService: TransactionService
    ) {
        this.transactionService = transactionService;
        this.lastChange = null;
    }

    public static async get() {
        await this.lock.promise
        this.lock.enable();
        if (!TransactionFacade.instance) {
            const transactionService = await TransactionService.get()
            this.instance = new TransactionFacade(transactionService)
            await this.instance.load();
        }
        this.lock.disable();
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
        const transactions = await this.transactionService.getTransactions();
        transactionsState.init(transactions);
    }
    
    private dirtyData() {
        this.lastChange = new Date();
    }

}