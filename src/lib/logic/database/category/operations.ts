import type { Category } from "$lib/logic/model/category";
import { init, prepend, remove, update } from "../common/operations";
import { categories, categoriesChange } from "./categories.state";
import { addDBCategory, deleteDBCategory, updateDBCategory, updateTransactionsCategory } from "./queries";

export const setCategories = (toSet: Category[]) => {
    init(categories, toSet);
    categoriesChange.set(false);
}

export const addCategory = (toAdd: Category) => {
    prepend(categories, toAdd)
    addDBCategory(toAdd);
    categoriesChange.set(new Date());
}

export const updateCategory = (toUpdate: Category) => {
    update(categories, toUpdate);
    updateDBCategory(toUpdate);
    categoriesChange.set(new Date());
}

export const deleteCategory = (toDelete: Category, newCategoryId: number) => {
    updateTransactionsCategory(toDelete.id as number, newCategoryId);
    remove(categories, toDelete);
    deleteDBCategory(toDelete);
    categoriesChange.set(new Date());
}