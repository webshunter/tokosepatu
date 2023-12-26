import { NextResponse, NextRequest } from "next/server";
import mysql from 'mysql2/promise';
import { DB_CONF } from "@/app/library/configDatabase";

export async function POST(req) {
    let body = await req.json();
    try {
        const connection = await mysql.createConnection(DB_CONF);
        const [results] = await connection.execute(
          'INSERT INTO req_properti (tgl, nama, telp, tipe, status, min, max, lokasi, kpr) VALUES (now(), ?, ?, ?, ?, ?, ?, ?, ?)',
          [body.fNama, body.fHP, body.fTipe, body.fJual, body.fMin, body.fMax, body.fLokasi, body.fKPR]
        );
        connection.end();
        return NextResponse.json({ message: results });
    } catch (error) {
        return NextResponse.json({ status: 500, message: error.message });
    }
}