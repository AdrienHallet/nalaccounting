import { writable, type Writable } from "svelte/store";

export class ArrayState<T extends {id?: number}> {
    public store: Writable<T[]> = writable([]);
    public lastChange: Date | null = null;

    public init = (items: T[]) => {
        this.store.update(() => items);
    }

    public prepend = (added: T) => {
        this.store.update(items => {
            return [added, ...items];
        });
    }

    public update = (updated: T) => {
        this.store.update(items => {
            if (!updated.id) {
                throw new Error('Cannot update item without id');
            }
            const toUpdateIndex = items.findIndex(item => item.id == updated.id);
            items[toUpdateIndex] = updated;
            return items;
        })
    }

    public delete = (deleted: T) => {
        this.store.update(value => {
            const index = value.findIndex(item => item.id == deleted.id);
            if (index > -1) {
                value.splice(index, 1);
                return value;
            } else {
                console.error(deleted);
                throw new Error('Could not delete item with id: ' + deleted.id);
            }
        })
    }
}