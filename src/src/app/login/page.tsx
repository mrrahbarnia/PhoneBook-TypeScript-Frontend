"use client"

import { useRouter } from "next/navigation";
import React, { useState, useEffect, Fragment } from "react";
import { Input } from "@/components/UI/Input";
import { useAtomValue } from "jotai";
import { loginMessage } from "@/contexts/messages";

export default function Page() {
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState("");
    const router = useRouter();
    const message = useAtomValue(loginMessage);
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
        }, 6000)
    }

    const errorHandler = (error: string) => {
        setFormError(error);
        setTimeout(() => {
            setFormError("");
        }, 6000)
    }

    const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        event.preventDefault();
    }

    const registerNavigateHandler = () => {
        router.replace("/register")
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
                <button onClick={registerNavigateHandler} className="hover:text-violet-300 font-bold text-white transition active:scale-75 dark:text-black dark:hover:text-purple-700" type="button">Register</button>
            </form>
        </div>
    </Fragment>
    )
}