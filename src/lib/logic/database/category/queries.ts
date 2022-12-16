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