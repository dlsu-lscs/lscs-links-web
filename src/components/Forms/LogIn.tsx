"use client";

import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useCookies } from "react-cookie";
import { useState } from "react";

const loginSchema = z.object({
  email: z
    .string()
    .email() // Validates that the string is a valid email format
    .refine((email) => email.endsWith("@dlsu.edu.ph"), {
      message: "Email must end with '@dlsu.edu.ph'",
    }),
  password: z.string(),
});

export const LogIn = () => {
  const [, setCurrentUser] = useCookies(["currentUser"]);
  const [, setCurrentToken] = useCookies(["currentToken"]);
  const [error, setError] = useState(null);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    const postData = async () => {
      try {
        const response = await axios.post(
          "https://lscs.info/auth/login",
          { email: values.email, password: values.password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.status == "success") {
          window.location.replace("/");
        }
        setCurrentUser("currentUser", response.data.user, { path: "/" });
        console.log(response.data.token);
        setCurrentToken("currentToken", response.data.token, { path: "/" });
      } catch (e) {
        console.log(e);
        setError(e.response.data.error);
      }
    };
    postData();
  };

  return (
    <>
      <div className="flex justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 bg-[#030711] border-2 border-[#1D283A] rounded-lg p-6 flex flex-col"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState: { error } }) => (
                <>
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="juan_delacruz@dlsu.edu.ph"
                        {...field}
                        className="text-black"
                      />
                    </FormControl>
                    <FormDescription>Input Email</FormDescription>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState: { error } }) => (
                <>
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                        className="text-black"
                      />
                    </FormControl>
                    <FormDescription>Input Password</FormDescription>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            {error ? <p className="text-red-500">{error}</p> : null}
            <Button type="submit" className="bg-[#F8FAFC] text-black">
              LogIn
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};
