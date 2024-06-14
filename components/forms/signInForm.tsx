"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { CardWrapper } from "@/components/global/cardWrapper"
import { SignInSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/forms/error";
import { FormSuccess } from "@/components/forms/success";
import { signin } from "@/actions/signIn";
import { useState, useTransition } from "react";

export const SignInForm = () => {
    
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    
    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = (values: z.infer<typeof SignInSchema>) => {
        //clear all
        setError("");
        setSuccess("");

        startTransition(() => {
            signin(values)
            .then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            })
            .catch((err) => {
                setError("An unexpected error occurred.");
                console.error(err);
            });
        });
    }

    return (
        
        <CardWrapper
            headerLabel="Welcome back"
            backButtonLabel="Don't have an account?"
            backButtonHref="/secure/sign-up"
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                       <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field}
                                        disabled={isPending}
                                        placeholder="exprays@tss.gg"
                                        type="email"
                                    />
                                </FormControl>
                                <FormMessage />       
                            </FormItem>
                        )}
                       />
                       {/**Password */}
                       <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field}
                                        disabled={isPending}
                                        placeholder="********"
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage />       
                            </FormItem>
                        )}
                       />
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button disabled={isPending} type="submit" className="w-full">
                        Sign in
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
