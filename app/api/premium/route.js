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
    let i = Object.values(params.limitation);
    const connection = await mysql.createConnection(DB_CONF);
    try {
        const query = `
        SELECT a.*, b.image FROM (
            SELECT * FROM listing WHERE approval=1 AND uid_user IN (
                SELECT uniqid FROM (
                    SELECT a.uniqid, COUNT(b.uniqid) AS listing FROM user a LEFT JOIN listing b ON b.uid_user=a.uniqid GROUP BY a.uniqid HAVING listing>0 ORDER BY listing DESC LIMIT 4
                ) AS data
            ) ORDER BY RAND() 
            LIMIT 
            ${(i[0]>0 ? i[0] : `1`)}
        ) a LEFT JOIN gallery b ON a.uniqid = b.uid_listing GROUP BY a.uniqid ORDER BY b.id`
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