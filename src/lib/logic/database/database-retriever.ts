import { AuthState } from "../auth/auth.state";
import { GithubApi } from "../github/github.api";
import type { IGithubRepo } from "../model/github-repo";
import { HttpError } from "../model/http-error";
import type { IUser } from "../model/user";
import { base64ToBlob } from "../utils/file.utils";
import { DATA_REPO_NAME, LOCAL_SHA } from "./database.const";

export default async (): Promise<[blob: Blob, sha: string] | never[]> => {
    return new Promise(function(resolve, reject) {
        const unsub = AuthState.userState.subscribe(async user => {
            if (user == null) {
                return;
            }
            try {
                const content = await GithubApi.getContent(user.login, DATA_REPO_NAME);
                if (content.length > 1) {
                    throw new Error('You tinkered with the source repository didn\'t you?');
                }
                if (content.length < 1) {
                    reject([]);
                }
                const gitBlob = await GithubApi.getBlob(content[0].git_url);
                const blob = await base64ToBlob(gitBlob.content);
                localStorage.setItem(LOCAL_SHA, gitBlob.sha);
                resolve([blob, gitBlob.sha]);
            } catch (error) {
                if (error instanceof HttpError && error.status === 404) {
                    console.log("No persisted database found, creating a new one ...");
                    await initializeRepository(user);
                    reject([]);
                }
                else {
                    // todo this
                    console.error(error);
                    throw new Error("recover from this noob");
                }
            } finally {
                unsub();
            }
        });
    });

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