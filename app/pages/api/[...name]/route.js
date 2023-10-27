// app/api/route.js
import { NextResponse, NextRequest } from "next/server";
import mysql from 'mysql2/promise';
import { func } from "prop-types";

function paramsToObject(req) {
    let reqq = req.nextUrl.searchParams.entries()
    let entries = reqq;
    const result = {}
    for (const [key, value] of entries) { // each 'entry' is a [key, value] tupple
        result[key] = value;
    }
    let limitation = {}
    let condition = {}
    let having = {}
    Object.keys(result).forEach((s,i)=>{
        if(s == 'limit' || s == 'start'){
            limitation[s] = result[s];
        }else if(s == 'd' ){
            having['judul'] = result[s];
            having['deskrisi'] = result[s];
        } else {
            condition[s] = result[s];
        }
    })

    return {
        limitation: limitation,
        condition: condition,
        having: having
    };
}

// Handles GET requests to /api
export async function GET(req, Response) {
    // create the connection to database
    let params = await paramsToObject(req);
    console.log(params)

    let {limit, start} = params.limitation;
    

    const connection = await mysql.createConnection({
        host: '202.157.177.241',
        user: 'adminjo',
        password: 'ValidJO$5758$',
        database: 'rjo'
    });
    try{
        const query = `SELECT a.*, b.image FROM listing a
        LEFT JOIN gallery b ON a.uniqid = b.uid_listing GROUP BY uniqid ${(function(){
            let d = Object.keys(params.having);
            if(d.length > 0){
                return ` HAVING ${d.map((c)=>{
                    return ` ${c} LIKE "%${params.having[c]}%" `;
                }).join(' OR ')} LIMIT ${start}, ${limit} `
            }
            return ""; 
        })()}`
        const value = [];
        const [data] = await connection.query(query);
        connection.end();
        return NextResponse.json({ message: data });
    }catch(error){
        return NextResponse.json({ status:500,message: error.message });
    }
}

// Handles POST requests to /api
export async function POST(req) {
    return NextResponse.json({ message: "Hello World" });
}