import { Balance } from "$lib/logic/model/balance";
import type { Transaction } from "$lib/logic/model/transaction";
import { derived, type Readable } from "svelte/store";
import { TransactionFacade } from "./transaction.facade";

export class BalanceFacade {
    private static instance: BalanceFacade;

    public dailyState: Readable<Balance[]>;

    private constructor(
        private transactionFacade: TransactionFacade
    ) {
        this.dailyState = derived(transactionFacade.getStore(), dailyFn);
    }

    public static async get(): Promise<BalanceFacade> {
        if (!BalanceFacade.instance) {
            const transactionFacade = await TransactionFacade.get()
            this.instance = new BalanceFacade(transactionFacade)
        }
        return BalanceFacade.instance;
    }
}

const dailyFn = (origin: Transaction[], set: (value: Balance[]) => void) => {
    const transactions = [...origin].sort((a, b) => a.date.localeCompare(b.date))
    const accumulation: Balance[] = [];
    let last: Balance = new Balance(transactions[0].date, 0);
    transactions.forEach(transaction => {
        if (last.date !== transaction.date) {
            accumulation.push(last);
            last = new Balance(transaction.date, last.amount);
        }
        last.amount = Number(last.amount) + Number(transaction.amount || 0) / 100; // Todo shouldn't have to cast here
    })
    accumulation.push(last);
    set(accumulation);
};