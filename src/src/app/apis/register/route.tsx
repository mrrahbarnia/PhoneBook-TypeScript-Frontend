"use server"

import { NextRequest, NextResponse } from "next/server"
import { EXTERNAL_API_URL } from "@/config/defaults";
import { RegisterOut } from "@/types/apis/Register";

const EXTERNAL_REGISTER_API = `${EXTERNAL_API_URL}/auth/register/`

export async function POST(request: NextRequest) {
    const data: RegisterOut = await request.json();
    

    const response = await fetch(EXTERNAL_REGISTER_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword
        })
    })
    const jsonResponse = await response.json();
    
    if (response.ok) {
        return NextResponse.json({"registered": true}, {status: 201})
    } else {
        return NextResponse.json({...jsonResponse}, {status: 400})
    }
}