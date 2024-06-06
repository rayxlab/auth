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

//Sign-up
export const SignUpSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string()
        .min(8, {
            message: "Minimum 8 characters required"
        })
        .regex(/[0-9]/, {
            message: "Password must contain at least one number"
        })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, {
            message: "Password must contain at least one special character"
        }),
    name: z.string().min(1, {
        message: "Name is required"
    })
});