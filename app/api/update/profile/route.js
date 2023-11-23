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

    let {limit, start} = params.limitation;
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_BASE
    });
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
        const [data] = await connection.query(query);
        connection.end();
        return NextResponse.json({ message:  data });
    }catch(error){
        return NextResponse.json({ status:500,message: error.message });
    }
}

Array.prototype.ToUpdate = function (table = 'test', wht = 'kode') {
    var s = this;
    if (s.length > 0) {
        var y = Object.keys(s[0]);
        var x = '';
        x += 'UPDATE ';
        x += '`'+table+'`';
        x += ' aa , ( ';
        x += 'SELECT ';
        x += y.map(function (g) {
            return `a.${g}`;
        });
        x += ' FROM (';
        x += s.map(function (w) {
            var f = ` SELECT `;
            f += y.map(function (q) {
                if (w[q]){
                    return `"${w[q].toString().replace(/\"/g, "\\\"")}" \`${q}\``;
                }else{
                    return `null \`${q}\``
                }
            }).join(",");
            return f;
        }).join("\n UNION ALL \n")
        x += ') a ) bb SET ';
        x += y.map(function (c) {
            return ` aa.${c} = bb.${c}`
        }).join(',');
        x += ' WHERE ';
        if (Array.isArray(wht)) {
            x += wht.map(function (whtx) {
                return ` aa.${whtx} = bb.${whtx} `;
            }).join(" AND ");
        } else {
            x += ` aa.${wht} = bb.${wht} `;
        }
        return x;
    } else {
        return [];
    }
};

// Handles POST requests to /api
export async function POST(req) {
    let body = await req.json();
    let update = [body].ToUpdate('user', 'uniqid');
    const connection = await mysql.createConnection({
        host: '193.203.167.219',
        user: 'rumahjo',
        password: 'rumahjo$123$',
        database: 'rjo'
    });
    const [data] = await connection.query(update);
    return NextResponse.json({ message: data });
}