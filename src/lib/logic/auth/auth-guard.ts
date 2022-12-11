import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import { get } from "svelte/store";
import { AuthService } from "./auth.service";
import { AuthState } from "./auth.state";
import { page } from '$app/stores';
import { setLoadingComponent } from "../loading/loading.state";
import { LOADING_COMPONENT } from "../loading/loading.enum";

export const guard = () => {
    if (browser) {
        if (isExcluded(
            '/about',
            '/about/changelog',
        )) {
            return;
        }
        setLoadingComponent(LOADING_COMPONENT.AUTHENTICATION, true);
        if (!get(AuthState.isAuthenticated)) {
            AuthService.get()
                .tryLocalAuthentication()
                .then((token) => {
                    if (token) {
                        onSuccessfulAuthentication();
                    } else {
                        goto("/login");
                    }
                });
        } else {
            onSuccessfulAuthentication();
        }
    }
};

const onSuccessfulAuthentication = async () => {
    setLoadingComponent(LOADING_COMPONENT.AUTHENTICATION, false);
};

const isExcluded = (...excluded: string[]) => {
    return excluded.includes(get(page).url.pathname);
}