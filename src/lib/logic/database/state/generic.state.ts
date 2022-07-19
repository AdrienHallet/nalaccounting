import { writable, type Writable } from "svelte/store";

export class ArrayState<T extends {id?: number}> {
    public store: Writable<T[]> = writable()

    public replace = (newValue: T[]) => {
        this.store.update(() => newValue);
    }

    public update = (updated: T) => {
        this.store.update(value => {
            if (!updated.id) {
                throw new Error('Cannot update item without id');
            }
            const toUpdateIndex = value.findIndex(item => item.id == updated.id);
            value[toUpdateIndex] = updated;
            return value;
        })
    }

    public add = (newItem: T) => {
        this.store.update(value => {
            return [...value, newItem];
        });
    }
}