import type { Transaction } from "$lib/logic/model/transaction";
import { init, prepend, remove, update } from "../common/operations";
import { transactions } from "./transactions.state";

export const setTransactions = (toSet: Transaction[]) => {
    init(transactions, toSet);
}

export const addTransaction = (toAdd: Transaction) => {
    prepend(transactions, toAdd)
}

export const updateTransaction = (toUpdate: Transaction) => {
    update(transactions, toUpdate);
}

export const deleteTransaction = (toDelete: Transaction) => {
    remove(transactions, toDelete);
}