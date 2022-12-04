import { Balance } from "$lib/logic/model/balance";
import type { Transaction } from "$lib/logic/model/transaction";
import { derived, type Readable } from "svelte/store";
import { transactionsState } from "../state/transactions.state";

export class BalanceFacade {
    private static instance: BalanceFacade;

    public dailyState: Readable<Balance[]>;

    private constructor(
    ) {
        this.dailyState = derived(transactionsState.store, dailyFn);
    }

    public static get(): BalanceFacade {
        if (!BalanceFacade.instance) {
            this.instance = new BalanceFacade()
        }
        return BalanceFacade.instance;
    }
}

const dailyFn = (origin: Transaction[], set: (value: Balance[]) => void) => {
    if (!origin) {
        set([]);
        return;
    }

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