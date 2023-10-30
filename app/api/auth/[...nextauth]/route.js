import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import  CredentialsProvider  from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"


const handler = NextAuth({
    providers: [
        GoogleProvider({ 
            clientId: process.env.GOOGLE_CLIENT_ID ?? ""
            , clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "", 
        }),
    ],
    secret: process.env.SECRET
});

export {handler as GET, handler as POST};