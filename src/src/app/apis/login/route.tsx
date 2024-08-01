"use server"

import { NextRequest, NextResponse } from "next/server"
import { EXTERNAL_API_URL } from "@/config/defaults";
import { LoginOut } from "@/types/apis/Login";
import { setAuthCookie } from "@/utils/auth";

const EXTERNAL_LOGIN_API = `${EXTERNAL_API_URL}/auth/login/`

export async function POST(request: NextRequest) {
    const data: LoginOut = await request.json();
    const formData = new FormData();
    formData.append("username", data.email)
    formData.append("password", data.password)

    const response = await fetch(EXTERNAL_LOGIN_API, {
        method: "POST",
        body: formData
    })
    const jsonResponse = await response.json();    

    if (response.ok) {
        setAuthCookie(jsonResponse.access_token);
        return NextResponse.json({"login": true}, {status: 200});
    } else {
        return NextResponse.json({...jsonResponse}, {status: 400})
    }
}