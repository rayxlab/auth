import NextAuth from "next-auth";
import authConfig from "@/utils/config/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";

import { db } from "./lib/db";
import { getUserById } from "./utils/data/user";


export const {
    handlers: { GET, POST },
    auth, signIn, signOut
} = NextAuth({
    callbacks: {
        //email verification challenge
        // async signIn({ user }) {
        //     const existingUser = await getUserById(user.id!);

        //     if(!existingUser || !existingUser.emailVerified) {
        //         return false;
        //     }

        //     return true;
        // },
        async session ({ token, session }) {
            if(token.sub && session.user) {
                session.user.id = token.sub;
            }
            //role
            if(token.role && session.user) {
                session.user.role = token.role as UserRole;
            }
            return session;
        },
        async jwt({ token }) {
            //role-access
            if(!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if(!existingUser) return token;

            token.role = existingUser.role;

            //ends

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session:{ strategy: "jwt" },
    ...authConfig,
});