import { writable } from "svelte/store";
import { LOADING_COMPONENT } from "./loading.enum";

export const isLoading = writable(new Map<LOADING_COMPONENT, boolean>([
    [LOADING_COMPONENT.AUTHENTICATION, false],
    // Application starts empty
    [LOADING_COMPONENT.TRANSACTIONS, true], 
    [LOADING_COMPONENT.CATEGORIES, true], 
]));

export const setLoadingComponent = (component: LOADING_COMPONENT, value: boolean) => {
    isLoading.update(map => {
        if (!map.has(component)) {
            throw new Error(`Unknown loading component: ${component}`);
        }
        map.set(component, value);
        return map;
    })
}