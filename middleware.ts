//NEXTJS specific
import NextAuth from "next-auth";

import authConfig from "@/utils/config/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    console.log("IS LOGGED:", isLoggedIn);
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
  };