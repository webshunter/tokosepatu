// app/api/route.js
import { Query } from "./sql";
import { NextResponse, NextRequest } from "next/server";

const mysql = require('mysql');


// Handles GET requests to /api
export async function GET(Request) {
    // ...
    return NextResponse.json({ message: "Hello World" });
}

// Handles POST requests to /api
export async function POST(req) {
    let q = await Query("SELECT 1+1 total");
    console.log(q);
    let data = await req.json();
    return NextResponse.json({
        query: q,
        data: data
    });
}