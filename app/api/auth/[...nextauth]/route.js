import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import  CredentialsProvider  from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [

        CredentialsProvider({
            name: "",
            credentials: {
                username: {
                    label: "Email:",
                    type: "text",
                    placeholder: ""
                }
                , password: {
                    label: "Password:",
                    type: "password",
                    placeholder: ""
                }
            },
            async authorize(credentials) {
                const user = { id: "42", name: "Demo", username: "demo@gmail.com", password: "demo" }
                if (credentials?.username === user.username && credentials?.password === user.password) {
                    return user;
                } else {
                    return null;
                }
            }
        }),
        GoogleProvider({ 
            clientId: process.env.GOOGLE_CLIENT_ID ?? ""
            , clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "", 
        }),
    ],
    secret: process.env.SECRET
});

export {handler as GET, handler as POST};