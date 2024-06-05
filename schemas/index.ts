//schemas for the app 

import * as z from "zod";

//Sign-in
//You can customize validation messages here
export const SignInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, {
        message: "Password is required"
    })
})