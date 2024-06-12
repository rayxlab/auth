import { SignInSchema } from "@/schemas";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";


import { getUserByEmail } from "../data/user";


export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }), 
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        Credentials({
            async authorize(credentials) {
                const  validatedFields = SignInSchema.safeParse(credentials);

                if(validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    //get the user
                    const user = await getUserByEmail(email);
                    //check for credentials
                    if(!user || !user.password) return null;

                    const matchedPassword = await bcrypt.compare(password, user.password);

                    if(matchedPassword) return user;
                }

                return null;
            }
        })
    ],
} satisfies NextAuthConfig;