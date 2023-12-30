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
    let find = {}
    let ordering = {}
    let limitation = {}
    Object.keys(result).forEach((s, i) => {
        if (s == 'limit' || s == 'start') {
            limitation[s] = result[s];
        } else if (s == 'order' || s == 'ascdesc') {
            ordering[s] = result[s];
        } else {
            find[s] = result[s];
        }
    })

    return {
        limitation: limitation,
        ordering: ordering,
        find: find
    };
}

// Handles GET requests to /api
export async function GET(req, Response) {
    // create the connection to database
    let params = await paramsToObject(req);
    let find = Object.values(params.find);
    const connection = await mysql.createConnection(DB_CONF);
    try {
        const query = `
        SELECT a.*, COUNT(b.uniqid) AS totlisting, SUM(b.price) AS totprice, 
            GROUP_CONCAT(DISTINCT c.name) AS kec, 
            GROUP_CONCAT(DISTINCT d.name) AS kab,
            SUM(laku) AS laku 
        FROM 
            user a 
                LEFT JOIN 
            listing b ON b.uid_user=a.uniqid 
                LEFT JOIN 
            kecamatan c ON c.id=b.kec 
                LEFT JOIN 
            kabupaten d ON d.id=b.kota 
        WHERE approval='1' AND price>0 GROUP BY a.uniqid
        HAVING fullname LIKE '%${find}%' OR kec LIKE '%${find}%' OR kab LIKE '%${find}%'`
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