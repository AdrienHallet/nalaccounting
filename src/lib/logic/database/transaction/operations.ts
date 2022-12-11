import type { Transaction } from "$lib/logic/model/transaction";
import { init, prepend, remove, update } from "../common/operations";
import { transactions, transactionsPristine } from "./transactions.state";

export const setTransactions = (toSet: Transaction[]) => {
    init(transactions, toSet);
    transactionsPristine.set(true);
}

export const addTransaction = (toAdd: Transaction) => {
    prepend(transactions, toAdd)
    transactionsPristine.set(false);
}

export const updateTransaction = (toUpdate: Transaction) => {
    update(transactions, toUpdate);
    transactionsPristine.set(false);
}

export const deleteTransaction = (toDelete: Transaction) => {
    remove(transactions, toDelete);
    transactionsPristine.set(false);
}