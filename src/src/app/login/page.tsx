"use client"

import { useRouter } from "next/navigation";
import React, { useState, useEffect, Fragment } from "react";
import { Input } from "@/components/UI/Input";
import { useSetAtom, useAtom } from "jotai";
import { loginMessage, homePageMessage } from "@/contexts/messageContext";
import { isAuthenticated, authenticatedEmail, setIsAuthenticatedToLocal } from "@/contexts/authContext";
import Link from "next/link";

const INTERNAL_LOGIN_API: string = "/apis/login"

export default function Page() {
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState("");
    const [message, setMessage] = useAtom(loginMessage);
    const setHomeMessage = useSetAtom(homePageMessage);
    const setIsAuthenticated = useSetAtom(isAuthenticated);
    const setAuthenticatedEmail = useSetAtom(authenticatedEmail);
    const router = useRouter();
    const [contextMessage, setContextMessage] = useState("");

    useEffect(() => {
        if (message) {
            contextMessageHandler(message);
        }
    }, [message])

    const contextMessageHandler = (message: string) => {
        setContextMessage(message);
        setTimeout(() => {
            setContextMessage("");
            setMessage(() => "");
        }, 6000)
    }

    const errorHandler = (error: string) => {
        setFormError(error);
        setTimeout(() => {
            setFormError("");
        }, 6000)
    }

    const formSubmitHandler = async(event: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        const eventForm = event.target as HTMLFormElement;
        event.preventDefault();
        if (eventForm.email.value === "" || eventForm.password.value === "") {
            errorHandler("Could not leave fields empty!")
        }
        const response = await fetch(INTERNAL_LOGIN_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": eventForm.email.value,
                "password": eventForm.password.value,
            })
        })
        const responseJson = await response.json()
        console.log(responseJson);
        if (responseJson?.detail && responseJson.detail === "There is no active account with the provided info") {
            errorHandler(responseJson.detail);
            setIsLoading(false);
            return;
        }
        if (response.ok) {
            setIsAuthenticatedToLocal("1", eventForm.email.value)
            setHomeMessage(() => `Welcome ${eventForm.email.value}`);
            setIsAuthenticated(() => true);
            setAuthenticatedEmail(() => eventForm.email.value);
            router.replace("/");
            return;
        }
    }

    return (
    <Fragment>
        {contextMessage && <div>
                <p className="bg-green-600 text-white p-3 rounded-lg mt-3 md:w-max">{contextMessage}</p>
            </div>}
        <div className="gradient shadow-slate-900 mt-6 md:w-7/12 md:mx-auto md:mt-12 shadow-2xl bg-slate-500 rounded-lg">
            <form onSubmit={formSubmitHandler} className="flex flex-col py-6 px-10 space-y-2">
                <h1 className="font-bold text-2xl text-center text-white dark:text-black">Login Form</h1>
                <div className="flex flex-col">
                    <Input type="email" name="email" label="Email" labelClassName="dark:text-black text-white font-semibold" inputClassName="font-semibold rounded-lg text-sm p-2 outline-none" />
                </div>
                <div className="flex flex-col">
                    <Input type="password" name="password" label="Password" labelClassName="dark:text-black text-white font-semibold" inputClassName="font-semibold rounded-lg text-sm p-2 outline-none" />
                </div>
                {formError && <p className="bg-red-700 text-white text-center rounded-lg py-1">{formError}</p>}
                <button className="hover:text-violet-300 font-bold text-white transition active:scale-75 dark:text-black dark:hover:text-purple-700" disabled={isLoading} type="submit">{isLoading ? "Please wait" : "Login"}</button>
                <p className="dark:text-black text-center text-white">Dont have an account?</p>
                <Link href="/register" className="text-center hover:text-violet-300 font-bold text-white transition active:scale-75 dark:text-black dark:hover:text-purple-700 underline underline-offset-1" type="button">Register</Link>
            </form>
        </div>
    </Fragment>
    )
}   