export type authToken = string;

export interface setIsAuthenticated {
    isAuthenticated: "0" | "1";
    authenticatedEmail: string
}