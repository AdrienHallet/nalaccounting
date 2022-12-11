import { writable, type Writable } from "svelte/store";

export class ArrayState<T extends {id?: number}> {
    public store: Writable<T[]> = writable([]);
    public lastChange: Date | null = null;

    
}