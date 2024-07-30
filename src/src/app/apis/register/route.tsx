"use server"

import { NextRequest, NextResponse } from "next/server"
import { EXTERNAL_API_URL } from "@/config/defaults";

const EXTERNAL_REGISTER_API = `${EXTERNAL_API_URL}/auth/register/`

export async function POST(request: NextRequest) {
    const data = await request.json();
    

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
    console.log(jsonResponse);
    
    
    if (jsonResponse?.detail === "Email already exists") {
        return NextResponse.json({...jsonResponse}, {status: 400})
    }
    return NextResponse.json({"registered": true}, {status: 201})
}