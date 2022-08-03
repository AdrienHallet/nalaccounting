import { get } from "svelte/store";
import { AuthState } from "../auth/auth.state";
import { GithubApi } from "../github/github.api";
import type { IGithubRepo } from "../model/github-repo";
import { HttpError } from "../model/http-error";
import type { IUser } from "../model/user";
import { base64ToBlob } from "../utils/file.utils";
import { DATA_REPO_NAME, LOCAL_SHA } from "./database.const";

export default async (): Promise<[blob: Blob, sha: string] | never[]> => {
    const user = get(AuthState.userState);
    // Todo probably not necessary (could directly attempt to retrieve file)
    // const repo = await getRepository(user);
    try {
        const content = await GithubApi.getContent(user.login, DATA_REPO_NAME);
        const gitBlob = await GithubApi.getBlob(content[0].git_url);
        const blob = await base64ToBlob(gitBlob.content);
        localStorage.setItem(LOCAL_SHA, gitBlob.sha);
        return [blob, gitBlob.sha];
    } catch (error) {
        if (error instanceof HttpError && error.status === 404) {
            console.log("No persisted database found, creating a new one ...");
            await initializeRepository(user);
            return [];
        }
        else {
            // todo this
            console.error(error);
            throw new Error("recover from this noob");
        }
    }    
}

async function initializeRepository(user: IUser): Promise<IGithubRepo> {
    let repo;
    try {
        // Ensure we have the repository
        repo = await GithubApi.getRepository(user.login, DATA_REPO_NAME);
    } catch (e) {
        if (e instanceof HttpError && e.status === 404) {
            // If we do not have a repository, create a new one
            console.log("No repository found, creating a new one ...");
            repo = await GithubApi.createRepository(DATA_REPO_NAME);
        } else {
            throw e;
        }
    }
    return repo;
}