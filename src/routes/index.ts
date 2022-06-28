import { AuthService } from "$lib/logic/auth/auth-service"

export async function get() {

    const authService = AuthService.get();
    if(!authService.isAuthenticated()) {
        return {
            headers: { Location: '/login' },
            status: 302
        }
    }
    return {}    
}