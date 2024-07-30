"use server"

import { NextRequest, NextResponse } from "next/server"
import { EXTERNAL_API_URL } from "@/config/defaults";
import { VerificationOut } from "@/types/apis/Verification";

const EXTERNAL_VERIFICATION_API = `${EXTERNAL_API_URL}/auth/verify-account/`

export async function POST(request: NextRequest) {
    const data: VerificationOut = await request.json();    

    const response = await fetch(EXTERNAL_VERIFICATION_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            verificationCode: data.verificationCode,
        })
    })
    const jsonResponse = await response.json();
    
    if (response.ok) {
        return NextResponse.json({"verified": true}, {status: 200})
    } else {
        return NextResponse.json({...jsonResponse}, {status: 400})
    }
}