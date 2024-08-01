"use server"

import { cookies } from "next/headers";
import { authToken } from "@/types/utils/auth";

const AUTH_TOKEN_COOKIE_KEY: string = "auth-token";
const AUTH_TOKEN_LIFE_TIME: number = 24 * 60 * 60 * 1000 // One day


export const setAuthCookie = (authToken: authToken) => {
    return cookies().set({
        name: AUTH_TOKEN_COOKIE_KEY,
        value: authToken,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
        maxAge: AUTH_TOKEN_LIFE_TIME
    })
    
};

export const getAuthCookie = () => {
    const authToken = cookies().get(AUTH_TOKEN_COOKIE_KEY)
    return authToken?.value
};

export const deleteAuthCookie = () => {
    return cookies().delete(AUTH_TOKEN_COOKIE_KEY)
};
