//server action for sign-in

"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { SignInSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_REDIRECT_ROUTE } from "@/routes";

export const signin = async (values: z.infer<typeof SignInSchema>) => {
    const validatedFields = SignInSchema.safeParse(values); //revalidate on server

    if(!validatedFields.success) {
        return { error: "Invalid Fields!" };
    }

    const { email, password } = validatedFields.data;

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_REDIRECT_ROUTE
        })
    } catch (error) {
        if(error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" }
                default:
                    return { error: "Something went wrong" }
            }
        }

        throw error;
    }
}