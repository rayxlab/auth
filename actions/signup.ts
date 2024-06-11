//server action

"use server";


import * as z from "zod";
import bcrypt from "bcryptjs";

import { SignUpSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/utils/data/user";

export const signup = async (values: z.infer<typeof SignUpSchema>) => {
    const validatedFields = SignUpSchema.safeParse(values); //revalidate on server

    if(!validatedFields.success) {
        return { error: "Invalid Fields!" };
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    //email check
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: "Email already taken!"};
    }

    //create user
    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword, //secure it before uploading to database
        }
    });

    //TODO: send verfication email

    return { success : "Account created!" };
}