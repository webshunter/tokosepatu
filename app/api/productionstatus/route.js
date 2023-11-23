// app/api/route.js
import { NextResponse, NextRequest } from "next/server";

import { statusProduction } from "@/app/library/configDatabase";

// Handles GET requests to /api
export async function GET(req, Response) {
    return NextResponse.json({ message: statusProduction });
}

// Handles POST requests to /api
export async function POST(req) {
    return NextResponse.json({ message: "Hello World" });
}