"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { CardWrapper } from "@/components/global/cardWrapper"
import { SignInSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SignInForm = () => {

    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    return (
        
        <CardWrapper
            headerLabel="Welcome back"
            backButtonLabel="Don't have an account?"
            backButtonHref="/secure/sign-up"
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(() => {})} className="space-y-6">
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
                                        placeholder="exprays@rayxlab.gg"
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
                                        placeholder="********"
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage />       
                            </FormItem>
                        )}
                       />
                    </div>
                    <Button type="submit" className="w-full">
                        Sign in
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}