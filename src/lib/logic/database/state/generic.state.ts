import { writable, type Writable } from "svelte/store";
import { StateAction, StateActionType } from "./state-action";

// Todo: Improvement idea: clear queue of nonsensical actions upon actions (e.g., clear updates after update/delete)
export class ArrayState<T extends {id?: number}> {
    public store: Writable<T[]> = writable();
    public actionQueue: StateAction<T>[] = []

    public init = (items: T[]) => {
        this.store.update(() => items);
    }

    public add = (added: T) => {
        this.store.update(items => {
            return [...items, added];
        });
        this.actionQueue.push(new StateAction(StateActionType.ADD, added));
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
        this.actionQueue.push(new StateAction(StateActionType.UPDATE, updated));
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
        this.actionQueue.push(new StateAction(StateActionType.DELETE, deleted));
    }
}