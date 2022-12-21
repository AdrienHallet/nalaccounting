import type { Category } from "$lib/logic/model/category";
import type { Transaction } from "$lib/logic/model/transaction";
import { derived, type Readable } from "svelte/store";
import { categories } from "../category/categories.state";
import { transactions } from "../transaction/transactions.state";

const categoryCountFn = ($values: [transactions: Transaction[], categories: Category[]], set: (value: CategoryCount[]) => void) => {
    const transactions = $values[0];
    const categories = $values[1];
    if (!transactions || transactions.length < 1) {
        set([]);
        return;
    }
    const categoryCountMap = new Map<number | undefined, number>();
    transactions.forEach(transaction => {
        if (!categoryCountMap.has(transaction.categoryId as number)) {
            categoryCountMap.set(transaction.categoryId, 0);
        }
        categoryCountMap.set(transaction.categoryId, categoryCountMap.get(transaction.categoryId) as number + 1);
    })
    const categoryCount = Array.from(categoryCountMap, ([id, count]) => ({
        category: categories.find(cat => cat.id === id),
        count: count,
    }))
    set(categoryCount);
};

export const categoryCountState: Readable<CategoryCount[]> = derived([transactions, categories], categoryCountFn);

export class CategoryCount {

    constructor(
        public category: Category | undefined,
        public count: number,
    ) {}
    
}
