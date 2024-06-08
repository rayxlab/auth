import { SignInSchema } from "@/schemas";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { getUserByEmail } from "../data/user";


export default {
    providers: [
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