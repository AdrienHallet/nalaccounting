import type { Transaction } from "$lib/logic/model/transaction";
import { init, prepend, remove, update } from "../common/operations";
import { addDBTransaction, deleteDBTransaction, updateDBTransaction } from "./queries";
import { transactions, transactionsChange } from "./transactions.state";

export const setTransactions = (toSet: Transaction[]) => {
    init(transactions, toSet);
    transactionsChange.set(false);
}

export const addTransaction = (toAdd: Transaction) => {
    prepend(transactions, toAdd);
    addDBTransaction(toAdd);
    transactionsChange.set(new Date());
}

export const updateTransaction = (toUpdate: Transaction) => {
    update(transactions, toUpdate);
    updateDBTransaction(toUpdate);
    transactionsChange.set(new Date());
}

export const deleteTransaction = (toDelete: Transaction) => {
    remove(transactions, toDelete);
    deleteDBTransaction(toDelete);
    transactionsChange.set(new Date());
}