// app/api/route.js
import { NextResponse, NextRequest } from "next/server";
import mysql from 'mysql2/promise';
import { func } from "prop-types";
import { DB_CONF } from "@/app/library/configDatabase";

function paramsToObject(req) {
    let reqq = req.nextUrl.searchParams.entries()
    let entries = reqq;
    const result = {}
    for (const [key, value] of entries) { // each 'entry' is a [key, value] tupple
        result[key] = value;
    }
    let ordering = {}
    let limitation = {}
    let condition = {}
    let having = {}
    Object.keys(result).forEach((s, i) => {
        if (s == 'limit' || s == 'start') {
            limitation[s] = result[s];
        } else if (s == 'order' || s == 'ascdesc') {
            ordering[s] = result[s];
        } else if (s == 'd') {
            having['judul'] = result[s];
            having['deskrisi'] = result[s];
        } else {
            condition[s] = result[s];
        }
    })

    return {
        limitation: limitation,
        ordering: ordering,
        condition: condition,
        having: having
    };
}

// Handles GET requests to /api
export async function GET(req, Response) {
    // create the connection to database
    let params = await paramsToObject(req);

    const connection = await mysql.createConnection(DB_CONF);
    try {
        const query = `
        SELECT * FROM gallery
        ${(function () {
            let d = Object.keys(params.condition);
            if (d.length > 0) {
                return ` WHERE ${d.map((c) => {
                    return ` ${c} = "${params.condition[c]}" `;
                }).join(' AND ')}  `
            }
            return "";
        })()}`
        const value = [];
        const [data] = await connection.query(query);
        connection.end();
        return NextResponse.json({ message: data });
    } catch (error) {
        return NextResponse.json({ status: 500, message: error.message });
    }
}

// Handles POST requests to /api
export async function POST(req) {
    return NextResponse.json({ message: "Hello World" });
}