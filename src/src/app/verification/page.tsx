"use client"

import { useRouter } from "next/navigation";
import React, { useState, useEffect, Fragment } from "react";
import { Input } from "@/components/UI/Input";
import { useAtomValue, useSetAtom, useAtom } from "jotai";
import { verificationMessage, loginMessage } from "@/contexts/messageContext";

const INTERNAL_VERIFICATION_API: string = "/apis/verification";

export default function Page() {
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState("");
    const [contextMessage, setContextMessage] = useState("");
    const router = useRouter();
    const [message, setMessage] = useAtom(verificationMessage);
    const setLoginMessage = useSetAtom(loginMessage);

    useEffect(() => {
        if (message) {
            contextMessageHandler(message);
        }
    }, [message])

    const contextMessageHandler = (message: string) => {
        setContextMessage(message);
        setTimeout(() => {
            setContextMessage("");
            setMessage(() => "")
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
        if (eventForm.verificationCode.value === "") {
            errorHandler("Could not leave verification code field empty!");
            setIsLoading(false);
            return;
        }
        const response = await fetch(INTERNAL_VERIFICATION_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "verificationCode": eventForm.verificationCode.value
            })
        })
        
        const responseJson = await response.json();
        console.log(responseJson);
        
        if (responseJson?.detail && responseJson.detail === "Verification code is invalid, get a new one") {
            errorHandler(responseJson.detail);
            setIsLoading(false);
            return;
        }
        if (response.ok) {
            setLoginMessage(() => "Your account has been verified...login please");
            return router.replace("/login");
        }
    }

    return (
        <Fragment>
            {contextMessage && <div>
                <p className="bg-green-600 text-white p-3 rounded-lg mt-3 md:w-max">{contextMessage}</p>
            </div>}
            <div className="gradient shadow-slate-900 mt-6 md:w-7/12 md:mx-auto md:mt-12 shadow-2xl bg-slate-500 rounded-lg">
                <form onSubmit={formSubmitHandler} className="flex flex-col py-6 px-10 space-y-2">
                    <h1 className="font-bold text-2xl text-center text-white dark:text-black">Verify Account</h1>
                    <div className="flex flex-col">
                        <Input type="text" name="verificationCode" label="Verification Code" labelClassName="dark:text-black text-white font-semibold" inputClassName="font-semibold rounded-lg text-sm p-2 outline-none" />
                    </div>
                    {formError && <p className="bg-red-700 text-white text-center rounded-lg py-1">{formError}</p>}
                    <button className="hover:text-violet-300 font-bold text-white transition active:scale-75 dark:text-black dark:hover:text-purple-700" disabled={isLoading} type="submit">{isLoading ? "Please wait" : "Verify"}</button>
                </form>
            </div>
        </Fragment>
    )
}