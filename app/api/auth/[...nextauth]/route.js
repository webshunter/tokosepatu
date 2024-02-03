import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        GoogleProvider({ 
            clientId: process.env.GOOGLE_CLIENT_ID ?? ""
            , clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "", 
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                datares: { label: "Data", type: "text", placeholder: "..." },
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                let [data] = credentials;
                if(data){
                    return {
                        user: {
                            email: data.email,
                            image: data.avatar,
                            name: data.nama
                        }
                    }
                }
                return null
            }
        })
    ],
    secret: process.env.SECRET
});

export {handler as GET, handler as POST};