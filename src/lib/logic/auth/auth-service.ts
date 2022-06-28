export class AuthService {

    private static instance: AuthService;

    private constructor() {
        // Prevents external initialization
    }

    public static get() {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    public isAuthenticated() {
        return false;
    }

}