import type { Category } from "$lib/logic/model/category";
import { DexieService } from "../dexie.service";

export const getDBCategories = async (): Promise<Category[]> => {
    const result = await DexieService.get().categories.orderBy('name').toArray();
    return result;
}

export const addDBCategory = async (toAdd: Category): Promise<number> => {
    const result = await DexieService.get().categories.add(toAdd);
    return result;
}

export const updateDBCategory = async (toUpdate: Category): Promise<number> => {
    if (toUpdate.id == null) {
        throw Error('Unexpected empty id');
    }
    const result = await DexieService.get().categories.update(toUpdate.id, toUpdate);
    return result;
}

export const deleteDBCategory = async (toDelete: Category): Promise<void> => {
    if (toDelete.id == null) {
        throw Error('Unexpected empty id');
    }
    const result = await DexieService.get().categories.delete(toDelete.id);
    return result;
}

export const getTransactionsPerCategory = async () => {
    const result = new Map<any, any>();
    await DexieService.get().transactions.orderBy('categoryId').eachKey(category => {
        result.set(category, (result.get(category) || 0) + 1);
    })
    return result;
}

export const updateTransactionsCategory = async (oldId: number, newId: number) => {
    await DexieService.get().transactions.where('categoryId').equals(oldId).modify({categoryId: newId});
}