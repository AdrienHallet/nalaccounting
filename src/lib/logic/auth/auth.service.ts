import Authenticator from 'netlify-auth-providers';
import { AuthState } from './auth.state';

/**
 * Handles the Authentication.
 * 
 * At the moment, authentication solely relies on GitHub.
 */
export class AuthService {
    private static instance: AuthService;
    private netlifyAuthenticator = new Authenticator({});

    /**
     * Private Constructor to enforce singleton service.
     */
    private constructor() {
        // Nothing to do
    }

    /**
     * Returns the service's instance.
     */
    public static get() {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    /**
     * Authenticates the user.
     */
    public async authenticate(): Promise<string> {
        const optToken = await this.tryLocalAuthentication();
        if (optToken) {
            return optToken;
        }
        return new Promise((resolve) => this.netlifyAuthenticator.authenticate(
            { 
                provider: "github",
                scope: "repo",
            },
            async (error, data) => {
                if (error) {
                    console.error(error);
                    throw Error("Could not authenticate through GitHub");
                } else {
                    const token = data?.token;
                    console.debug("[AUTH] Token acquired: " + token);
                    this.setLocalStorageToken(token);
                    await AuthState.setToken(token)
                    resolve(token as string)
                }
            }
        ));
    }

    public async tryLocalAuthentication(): Promise<string | null> {
        const localStorageToken = this.getLocalStorageToken(); // might be null if none present
        if (localStorageToken) {
            await AuthState.setToken(localStorageToken)
        }
        return localStorageToken;
    }

    private getLocalStorageToken() {
        return localStorage.getItem('token');
    }

    private setLocalStorageToken(token?: string) {
        token ? localStorage.setItem('token', token) : localStorage.removeItem('token');
    }
}