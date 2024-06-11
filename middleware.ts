//NEXTJS specific
import NextAuth from "next-auth";

import authConfig from "@/utils/config/auth.config";
import {
    DEFAULT_REDIRECT_ROUTE,
    apiAuthPrefix,
    authRoutes,
    publicRoutes
} from "@/routes"

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if(isApiAuthRoute) {
        return;
    }

    if(isAuthRoute) {
        if(isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_REDIRECT_ROUTE, nextUrl));
        }
        return;
    }

    if(!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL("/secure/sign-in", nextUrl));
    }

    return;
    
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
  };