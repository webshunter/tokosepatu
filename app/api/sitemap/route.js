// app/api/route.js
import { NextResponse, NextRequest } from "next/server";
import mysql from 'mysql2/promise';
import { func } from "prop-types";
import fs from 'fs';
import path from 'path';
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

Array.prototype.cond = function (search = '', name = '') {
    if (search != '') {
        if (typeof search == 'number') {
            search = search.toString().toLowerCase();
        } else {
            search = search.toLowerCase();
        }

        var data = this;
        return data.filter(function (dat) {
            if (typeof dat == 'object') {
                var g = dat[name];
                var numcek = 0;
                if (g != null) {
                    if (typeof g == 'number') {
                        g = g.toString().toLowerCase();
                    } else {
                        g = g.toLowerCase();
                    }
                    if (numcek == 0) {
                        if (g == search) {
                            numcek = 1;
                        }
                    }
                }
                if (numcek == 1) {
                    return dat;
                }
            } else {
                if (dat != null) {
                    if (typeof dat == 'number') {
                        var dats = dat.toString().toLowerCase();
                        if (dats == search) {
                            return dat
                        }
                    } else {
                        if (dat.toLowerCase() == search) {
                            return dat
                        }
                    }
                }
            }
        })
    } else {
        return [];
    }
}

// Handles GET requests to /api
export async function GET(req, Response) {
    // create the connection to database
    const connection = await mysql.createConnection(DB_CONF);
    try{
        const query = `
        SELECT uid_user, concat('map-',uid_user,'.xml') url, min(userlog) log FROM listing GROUP BY uid_user;
        SELECT uid_user, concat('produk/', slug) url, userlog log FROM listing
        `
        const [parentData] = await connection.query(query);
        const [parent, xmldata] = parentData;
        console.log(xmldata);
        const pathLoc = path.join('public','sitemap.xml');
        let parentXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
        <loc>https://rumahjo.com/main.xml</loc>
    </sitemap>
${parent.map(function (m) {
    return `
    <sitemap>
        <loc>https://rumahjo.com/${m.url}</loc>
    </sitemap>
    `
}).join('')}
</sitemapindex>
`;
        fs.writeFileSync(pathLoc, parentXml,'utf8');
        for (let dataPar of parent){
            let getData = xmldata.cond(dataPar.uid_user, 'uid_user');
            let fileNama = path.join('public', 'map-' + dataPar.uid_user + '.xml' );
            let fileData = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
<!-- created with Free Online Sitemap Generator www.xml-sitemaps.com -->
${getData.map(function (m) {
    return `
    <url>
        <loc>https://rumahjo.com/${m.url}</loc>
        <lastmod>${ubahFormatTanggal(m.log)}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
    </url>
    `
}).join('')}
</urlset>`;
            fs.writeFileSync(fileNama, fileData);
        }

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