import { NextResponse, NextRequest } from "next/server";
import mysql from 'mysql2/promise';
import { signIn } from "next-auth/react";
import { DB_CONF } from "@/app/library/configDatabase";

export async function GET(req, Response) {

}

export async function POST(req){
   try {
      let data = await req.json();
      const connection = await mysql.createConnection(DB_CONF);
      const [dataResponse] = await connection.query(`SELECT * FROM user WHERE telp='${data.telp.replace(/\+/gi,'')}'`);
      return NextResponse.json({ success: dataResponse });
    }
    catch(e){
       if (e.type === 'CredentialsSignin') {
           NextResponse.json({ error: 'Invalid credentials.' })
        } else {
           NextResponse.json({ error: 'Something went wrong.' })
        }
    }
}