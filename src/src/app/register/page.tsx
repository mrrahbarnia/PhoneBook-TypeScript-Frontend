"use client"

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Input } from "@/components/UI/Input";
import { useSetAtom } from "jotai";
import { verificationMessage } from "@/contexts/messages";

const INTERNAL_REGISTER_API: string = "/apis/register"

export default function Page() {
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState("");
    const router = useRouter();
    const setVerificationMessage = useSetAtom(verificationMessage);

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
        if (eventForm.email.value === "" || eventForm.password.value === "" || eventForm.confirmPassword.value === "") {
            errorHandler("Could not leave fields empty!")
        }
        if (eventForm.password.value != eventForm.confirmPassword.value) {
            errorHandler("Passwords must be match!");
            setIsLoading(false);
        }
        const response = await fetch(INTERNAL_REGISTER_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": eventForm.email.value,
                "password": eventForm.password.value,
                "confirmPassword": eventForm.confirmPassword.value
            })
        })
        
        const responseJson = await response.json();
        if (responseJson?.detail && responseJson.detail === 'Email already exists') {
            errorHandler(responseJson.detail);
            setIsLoading(false);
        }
        if (responseJson?.detail && responseJson.detail[0].msg?.includes('Has minimum 8 characters in length')) {
            errorHandler("Password must at least 8 characters including at least one lower case,upper case,number and special character(@,$,#,...)")
            setIsLoading(false);
        }
        if (response.ok) {
            setVerificationMessage(() => "Enter the verification code from your email.")
            return router.replace("/verification")
        }
    }

    const LoginNavigateHandler = () => {
        router.replace("/login")
    }

    return (<div className="gradient shadow-slate-900 mt-6 md:w-7/12 md:mx-auto md:mt-12 shadow-2xl bg-slate-500 rounded-lg">
        <form onSubmit={formSubmitHandler} className="flex flex-col py-6 px-10 space-y-2">
            <h1 className="font-bold text-2xl text-center text-white dark:text-black">Registration Form</h1>
            <div className="flex flex-col">
                <Input type="email" name="email" label="Email" labelClassName="dark:text-black text-white font-semibold" inputClassName="font-semibold rounded-lg text-sm p-2 outline-none" />
            </div>
            <div className="flex flex-col">
                <Input type="password" name="password" label="Password" labelClassName="dark:text-black text-white font-semibold" inputClassName="font-semibold rounded-lg text-sm p-2 outline-none" />
            </div>
            <div className="flex flex-col">
                <Input type="password" name="confirmPassword" label="Confirmation Password" labelClassName="dark:text-black text-white font-semibold" inputClassName="font-semibold rounded-lg text-sm p-2 outline-none" />
            </div>
            {formError && <p className="bg-red-700 text-white text-center rounded-lg py-1">{formError}</p>}
            <button className="hover:text-violet-300 font-bold text-white transition active:scale-75 dark:text-black dark:hover:text-purple-700" disabled={isLoading} type="submit">{isLoading ? "Please wait" : "Register"}</button>
            <button onClick={LoginNavigateHandler} className="hover:text-violet-300 font-bold text-white transition active:scale-75 dark:text-black dark:hover:text-purple-700" type="button">Login</button>
        </form>
    </div>)
}