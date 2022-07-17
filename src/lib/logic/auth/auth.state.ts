import type { IUser } from "$lib/logic/model/user";
import { writable, type Writable, get, derived } from "svelte/store";
import { GithubApi } from "../github/github.api";

export class AuthState {

    public static userState: Writable<IUser> = writable();
    public static tokenState: Writable<string> = writable();
    public static isAuthenticated = derived(this.userState, $userState => $userState != null, false);

    public static hasUser(): boolean {
        return get(this.userState) == null;
    }

    public static hasToken(): boolean {
        return get(this.tokenState) == null;
    }

    public static async setToken(token: string) {
        if(!token) {
            return;
        }
        console.log("Token Change: " + token)
        GithubApi.setToken(token);
        const user: IUser = await GithubApi.getUser();
        this.userState.update(() => user);
        this.tokenState.update(() => token);
    }

}



