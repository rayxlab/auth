//server action

"use server";


import { SignUpSchema } from "@/schemas";
import * as z from "zod";

export const signup = async (values: z.infer<typeof SignUpSchema>) => {
    const validatedFields = SignUpSchema.safeParse(values); //revalidate on server

    if(!validatedFields.success) {
        return { error: "Inavlid Fields!" };
    }

    return { success : "Valid" };
}