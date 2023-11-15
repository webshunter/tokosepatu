// app/api/route.js
import { NextResponse, NextRequest } from "next/server";
import mysql from 'mysql2/promise';
import { func } from "prop-types";
import fs from 'fs';
import path from 'path';

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

function ubahFormatTanggal(tanggal) {
    // Buat objek Date dari string tanggal input
    var tanggalObjek = new Date(tanggal);

    // Ambil elemen tanggal, bulan, tahun, jam, menit, dan detik
    var tahun = tanggalObjek.getUTCFullYear();
    var bulan = ('0' + (tanggalObjek.getUTCMonth() + 1)).slice(-2);
    var tanggal = ('0' + tanggalObjek.getUTCDate()).slice(-2);
    var jam = ('0' + tanggalObjek.getUTCHours()).slice(-2);
    var menit = ('0' + tanggalObjek.getUTCMinutes()).slice(-2);
    var detik = ('0' + tanggalObjek.getUTCSeconds()).slice(-2);

    // Format ulang tanggal
    var tanggalFormatBaru = tahun + '-' + bulan + '-' + tanggal + 'T' + jam + ':' + menit + ':' + detik + '+00:00';

    return tanggalFormatBaru;
}

// Handles GET requests to /api
export async function GET(req, Response) {
    // create the connection to database
    const connection = await mysql.createConnection({
        host: '193.203.167.219',
        user: 'rumahjo',
        password: 'rumahjo$123$',
        database: 'rjo',
        multipleStatements: true
    });
    try{
        const query = `
        SELECT concat('map-',uid_user,'.xml') url, max(userlog) log FROM listing GROUP BY uid_user;
        SELECT uid_user, concat('produk/', slug) url, userlog FROM listing
        `
        const [parentData] = await connection.query(query);
        const [parent, xmldata] = parentData;
        console.log(xmldata);
        const pathLoc = path.join('public','sitemap.xml');
        let parentXml = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset
            xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
        <!-- created with Free Online Sitemap Generator www.xml-sitemaps.com -->

        <url>
        <loc>http://rumahjo.com/</loc>
        <lastmod>2023-11-13T15:48:38+00:00</lastmod>
        </url>
        ${parent.map(function(m){
            return  `
            <url>
                <loc>http://rumahjo.com/${m.url}</loc>
                <lastmod>${ubahFormatTanggal(m.log)}</lastmod>
            </url>
            `
        }).join('')}

        </urlset>
        `;
        fs.writeFileSync(pathLoc, parentXml,'utf8');
        const value = [];
        return NextResponse.json({ message: "created" });
    }catch(error){
        return NextResponse.json({ status:500,message: error.message });
    }
}

// Handles POST requests to /api
export async function POST(req) {
    return NextResponse.json({ message: "Hello World" });
}