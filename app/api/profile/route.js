import { NextResponse, NextRequest } from "next/server";
import fs from 'fs';
import mysql from 'mysql2/promise';
import { DB_CONF } from "@/app/library/configDatabase";
// Handles GET requests to /api
export async function GET(req, Response) {
    return NextResponse.json({ message: "Hello World" });
}

Array.prototype.ToUpdate = function (table = 'test', wht = 'kode') {
    var s = this;
    if (s.length > 0) {
        var y = Object.keys(s[0]);
        var x = '';
        x += 'UPDATE ';
        x += '`' + table + '`';
        x += ' aa , ( ';
        x += 'SELECT ';
        x += y.map(function (g) {
            return `a.${g}`;
        });
        x += ' FROM (';
        x += s.map(function (w) {
            var f = ` SELECT `;
            f += y.map(function (q) {
                if (w[q]) {
                    return `"${w[q].toString().replace(/\"/g, "\\\"")}" \`${q}\``;
                } else {
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

function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function () {
            const base64String = reader.result.split(',')[1]; // Mengambil bagian base64 saja
            resolve(base64String);
        };
        reader.onerror = function (error) {
            reject(error);
        };
        reader.readAsDataURL(blob);
    });
}

// Handles POST requests to /api
export async function POST(req) {
    const data = await req.formData();
    const content = data.get('content');
    const uniq = data.get('uniq');
    if (!fs.existsSync('../apirumahjo/public/user')){
        fs.mkdirSync('../apirumahjo/public/user', 0o777);
    }
    let update = [
        {
            uniqid : uniq,
            avatar: 'https://app.rumahjo.com/user/'+uniq+'.webp'
        }
    ].ToUpdate('user',['uniqid']);
    fs.writeFileSync('../apirumahjo/public/user/' + uniq + '.webp', content, 'base64', { mode: 0o777 })
    const connection = await mysql.createConnection(DB_CONF);
    const [datares] = await connection.query(update);
    return NextResponse.json({ message: datares });
}