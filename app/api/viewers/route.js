// app/api/route.js
import { NextResponse, NextRequest } from "next/server";
import mysql from 'mysql2/promise';
import { func } from "prop-types";
import { DB_CONF } from "@/app/library/configDatabase";


Array.prototype.ToInsert = function (table = 'test', wht = '') {
    var s = this;
    if (s.length > 0) {
        var y = Object.keys(s[0]);
        var x = '';
        x += 'INSERT INTO ';
        x += table;
        x += '(';
        x += y.map(function (u) {
            return ` \`${u}\` `
        }).join(',');
        x += ')';
        x += '\n';
        x += 'SELECT ';
        x += y.map(function (g) {
            return `a.${g}`;
        });
        x += ' FROM (';
        x += s.map(function (w) {
            var f = ` SELECT `;
            f += y.map(function (q) {
                if (w[q] != null) {
                    return `"${w[q].toString().replace(/\"/g, "\\\"")}" \`${q}\``;
                } else {
                    return `"-" \`${q}\``;
                }
            }).join(",");
            return f;
        }).join("\n UNION ALL \n")
        x += ') a';
        if (Array.isArray(wht)) {
            x += ` LEFT JOIN ${table} ON `
            x += wht.map(function (whtx) {
                return ` ${table}.${whtx} = a.${whtx} `;
            }).join(" AND ");
            x += ` WHERE `;
            x += wht.map(function (whtx) {
                return ` ${table}.${whtx} IS NULL `;
            }).join(" AND ");
        }
        return x;
    } else {
        return [];
    }
};

// Handles POST requests to /api
export async function POST(req) {
    let body = await req.json();
    let insert = [body].ToInsert('views', ['id','slug', 'nilai'])
    insert += `; UPDATE listing aa, (
SELECT nilai, slug FROM views_listing
) bb SET aa.klik = bb.nilai WHERE aa.slug = bb.slug`;
    const connection = await mysql.createConnection(DB_CONF);
    const [data] = await connection.query(insert);
    return NextResponse.json({ message: data });
}