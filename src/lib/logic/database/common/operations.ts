import type { Writable } from "svelte/store";

export const init = <T>(store: Writable<T[]>, items: T[]) => {
    store.update(() => items);
}

export const prepend = <T>(store: Writable<T[]>, added: T) => {
    store.update(items => {
        return [added, ...items];
    });
}

export const update = <T extends {id?: number}>(store: Writable<T[]>, updated: T) => {
    store.update(items => {
        if (!updated.id) {
            throw new Error('Cannot update item without id');
        }
        const toUpdateIndex = items.findIndex(item => item.id == updated.id);
        items[toUpdateIndex] = updated;
        return items;
    })
}

export const remove = <T extends {id?: number}>(store: Writable<T[]>, removed: T) => {
    store.update(value => {
        const index = value.findIndex(item => item.id == removed.id);
        if (index > -1) {
            value.splice(index, 1);
            return value;
        } else {
            console.error(removed);
            throw new Error('Could not delete item with id: ' + removed.id);
        }
    })
}