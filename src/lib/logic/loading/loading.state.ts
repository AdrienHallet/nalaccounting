import { writable } from "svelte/store";
import { LOADING_COMPONENT } from "./loading.enum";

export const isLoading = writable(false);

export const setLoadingComponent = (component: LOADING_COMPONENT, isLoading: boolean) => {
    if (!loadingMap.has(component)) {
        throw new Error(`Unknown loading component: ${component}`);
    }
    loadingMap.set(component, isLoading);
    refreshLoading()
}

const loadingMap = new Map<LOADING_COMPONENT, boolean>([
    [LOADING_COMPONENT.AUTHENTICATION, false],
    [LOADING_COMPONENT.TRANSACTIONS, false],
]);

const refreshLoading = () => {
    console.log(loadingMap);
    loadingMap.forEach(loadingComponent => {
        if (loadingComponent) {
            isLoading.set(true);
            return;
        }
    })
    isLoading.set(false);
}