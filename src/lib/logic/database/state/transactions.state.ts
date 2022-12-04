import type { Transaction } from "$lib/logic/model/transaction";
import { ArrayState } from "../state/generic.state";

export const transactionsState: ArrayState<Transaction> = new ArrayState<Transaction>();;