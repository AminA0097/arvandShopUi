export interface LoginRequest {
    identifier: string;
    password: string;
    rememberMe: boolean;
}
export interface RegisterRequest {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}
export interface AuthUser {
    id: string;
    fullName: string;
    email: string;
    role: "user" | "admin";
}

export interface AuthResponse {
    user: AuthUser;
    accessToken: string;
    refreshToken?: string;
}