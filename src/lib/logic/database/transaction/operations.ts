import type { Transaction } from "$lib/logic/model/transaction";
import { init, prepend, remove, update } from "../common/operations";
import { transactions, transactionsChange } from "./transactions.state";

export const setTransactions = (toSet: Transaction[]) => {
    init(transactions, toSet);
    transactionsChange.set(false);
}

export const addTransaction = (toAdd: Transaction) => {
    prepend(transactions, toAdd)
    transactionsChange.set(true);
}

export const updateTransaction = (toUpdate: Transaction) => {
    update(transactions, toUpdate);
    transactionsChange.set(true);
}

export const deleteTransaction = (toDelete: Transaction) => {
    remove(transactions, toDelete);
    transactionsChange.set(true);
}