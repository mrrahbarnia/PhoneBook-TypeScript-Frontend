"use server"

import { NextResponse } from "next/server"
import { deleteAuthCookie } from "@/utils/auth";

export async function GET() {    
    deleteAuthCookie();

    return NextResponse.json({"login": true}, {status: 200});
}