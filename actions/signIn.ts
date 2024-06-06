//server action

"use server";

import { SignInSchema } from "@/schemas";
import { error } from "console";
import * as z from "zod";

export const signin = async (values: z.infer<typeof SignInSchema>) => {
    const validatedFields = SignInSchema.safeParse(values); //revalidate on server

    if(!validatedFields.success) {
        return { error: "Inavlid Fields!" };
    }

    return { success : "Valid" };
}