"use client"

import { atom } from "jotai";

export const LOCAL_STORAGE_AUTH_KEY: string = "is-authenticated";
export const LOCAL_STORAGE_EMAIL_KEY: string = "authenticated-email";

export const getAuthenticatedFromLocal = (): {authKey: string | null, authEmail: string | null} => {
    const authKey = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)
    const authEmail = localStorage.getItem(LOCAL_STORAGE_EMAIL_KEY)
    return {authKey: authKey, authEmail: authEmail}
}

export const isAuthenticated = atom(
    getAuthenticatedFromLocal().authKey === "1"
);
export const authenticatedEmail = atom(
    getAuthenticatedFromLocal().authEmail
);


export const setIsAuthenticatedToLocal = (isAuthenticated: "0" | "1", authenticatedEmail: string) => {
    localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, isAuthenticated)
    if (isAuthenticated && isAuthenticated === "1") {
        return localStorage.setItem(LOCAL_STORAGE_EMAIL_KEY, authenticatedEmail)
    }
    if (isAuthenticated && isAuthenticated === "0") {
        localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
        return localStorage.removeItem(LOCAL_STORAGE_EMAIL_KEY);
    }
}
