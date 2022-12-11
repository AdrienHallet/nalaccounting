import type { Transaction } from "$lib/logic/model/transaction";
import { writable, type Writable } from "svelte/store";

export const transactions: Writable<Transaction[]> = writable();

export const transactionsChange = writable(false);