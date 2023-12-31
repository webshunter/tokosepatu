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

    let {limit, start} = params.limitation;
    
    const connection = await mysql.createConnection(DB_CONF);
    try{
        const query = `SELECT a.*, b.image, c.fullname, c.telp phone FROM listing a
        LEFT JOIN user c ON c.email = a.email
        LEFT JOIN gallery b ON a.uniqid = b.uid_listing 
        ${(function(){
            let d = Object.keys(params.condition);
            if(d.length > 0){
                return ` WHERE ${d.map((c)=>{
                    return ` ${c} = "${params.condition[c]}" `;
                }).join(' OR ')} LIMIT 1 `
            }
            return ""; 
        })()}`
        const value = [];
        const [data] = await connection.query(query);
        const [dataRender] = data;
        let dataimg = [];
        if(dataRender){
            let uniqid = dataRender.uniqid;
            let getImage = `SELECT * FROM gallery WHERE uid_listing = "${uniqid}"`;
            let [getData] = await connection.query(getImage);
            dataimg = getData;
        }
        connection.end();
        return NextResponse.json({ message: [dataimg, data] });
    }catch(error){
        return NextResponse.json({ status:500,message: error.message });
    }
}

// Handles POST requests to /api
export async function POST(req) {
    return NextResponse.json({ message: "Hello World" });
}