import { get } from "svelte/store";
import { GithubApi } from "../github/github.api";
import { AuthState } from "../auth/auth.state";
import { DATA_FILE_NAME, DATA_REPO_NAME, LOCAL_SHA } from "./database.const";
import { DexieService } from "./dexie.service";

export default async () => {
    const user = get(AuthState.userState);
    const db = await DexieService.get();
    const blob = await db.export();
    console.log(blob);
    const sha = localStorage.getItem(LOCAL_SHA) ?? undefined;
    const response = await (await (GithubApi.putBlob(user.login, DATA_REPO_NAME, blob, DATA_FILE_NAME, sha))).json();
    localStorage.setItem(LOCAL_SHA, response.content.sha)
}
