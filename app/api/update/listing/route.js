// app/api/route.js
import { NextResponse, NextRequest } from "next/server";
import mysql from 'mysql2/promise';
import { func } from "prop-types";
import { DB_CONF } from "@/app/library/configDatabase";

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
                    if (w[q]!=='now') {
                        return `"${w[q].toString().replace(/\"/g, "\\\"")}" \`${q}\``;
                    } else {
                        return `now() \`${q}\``;
                    }                    
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
    let update = [body].ToUpdate('listing', 'uniqid');
    console.log(update);
    const connection = await mysql.createConnection(DB_CONF);
    const [data] = await connection.query(update);
    return NextResponse.json({ message: data });
}