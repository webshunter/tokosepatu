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
    let status = {}
    let keyword = {}
    let type = {}
    let order = {}
    let condition = {}
    Object.keys(result).forEach((s, i) => {
        if (s == 'status') {
            status[s] = result[s];
        } else if (s == 'keyword') {
            keyword[s] = result[s];
        } else if (s == 'type') {
            type[s] = result[s];
        } else if (s == 'order') {
            order[s] = result[s];
        } else {
            condition[s] = result[s];
        }
    })

    return {
        status: status,
        keyword: keyword,
        type: type,
        order: order,
        condition: condition
    };
}

// Handles GET requests to /api
export async function GET(req, Response) {
    // create the connection to database
    let params = await paramsToObject(req);
    let status = Object.values(params.status);
    let keyword = Object.values(params.keyword);    
    let type = Object.values(params.type);
    let order = Object.values(params.order);
    const connection = await mysql.createConnection(DB_CONF);
    try {
        const query = `
        SELECT a.*, b.image FROM (
            SELECT * FROM listing WHERE approval>=1 AND 
            status='${status}' AND slug2 LIKE '%${type}%' AND 
            (
                judul LIKE '%${keyword=='' ? type : keyword}%' OR 
                deskrisi LIKE '%${keyword=='' ? type : keyword}%' OR 
                alamat LIKE '%${keyword=='' ? type : keyword}%'
            )
            LIMIT 500
        ) a LEFT JOIN gallery b ON a.uniqid = b.uid_listing GROUP BY a.uniqid
        ORDER BY 
            ${order=='' ? `klik DESC` : order<'3' ? ` price ` + (order=='1' ? `DESC` : `ASC`) : ` userlog ` + (order=='3' ? `DESC` : `ASC`)}
        `
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