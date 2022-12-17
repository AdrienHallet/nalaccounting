import type { Category } from "$lib/logic/model/category";
import { writable, type Writable } from "svelte/store";

export const categories: Writable<Category[]> = writable();

export const categoriesChange: Writable<boolean | Date> = writable(false);