import { get } from "svelte/store";
import { GithubApi } from "../github/github.api";
import { DatabaseService } from "./database.service";
import { AuthState } from "../auth/auth.state";
import { DATA_FILE_NAME, DATA_REPO_NAME, LOCAL_SHA } from "./database.const";

export default async () => {
    const user = get(AuthState.userState);
    const db = (await DatabaseService.get()).db;
    const blob = await db.export();
    console.log(blob);
    const sha = localStorage.getItem(LOCAL_SHA) ?? undefined;
    await GithubApi.putBlob(user.login, DATA_REPO_NAME, blob, DATA_FILE_NAME, sha);
}
