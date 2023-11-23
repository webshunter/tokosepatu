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
        const query = `SELECT * FROM user  
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
        const [datas] = await connection.query(query);
        let [data] = datas;
        connection.end();
        return NextResponse.json({ message:  [{
            uniqid: data.uniqid,
            fullname: data.fullname,
            email: data.email,
            tgldaftar: data.tgldaftar,
            about: data.about,
            telp: data.telp,
            avatar: data.avatar,
        }] });
    }catch(error){
        return NextResponse.json({ status:500,message: error.message });
    }
}

// Handles POST requests to /api
export async function POST(req) {
    return NextResponse.json({ message: "Hello World" });
}