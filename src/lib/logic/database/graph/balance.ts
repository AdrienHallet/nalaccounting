import { Balance } from "$lib/logic/model/balance";
import type { Transaction } from "$lib/logic/model/transaction";
import { derived, readable, writable, type Readable, type Writable } from "svelte/store";
import { transactions } from "../transaction/transactions.state";

const dailyFn = (origin: Transaction[], set: (value: Balance[]) => void) => {
    if (!origin || origin.length < 1) {
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
    lastBalance.set(last);
    set(accumulation);
};

export const dailyState: Readable<Balance[]> = derived(transactions, dailyFn);

export const lastBalance: Writable<Balance> = writable()