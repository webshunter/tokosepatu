// app/api/route.js
import { Query } from "./sql";
import { NextResponse, NextRequest } from "next/server";

const mysql = require('mysql');

// Handles GET requests to /api
export async function GET(Request) {
    return NextResponse.json({ message: "Hello World" });
}

// Handles POST requests to /api
export async function POST(req) {
    return NextResponse.json({ message: "Hello World" });
}