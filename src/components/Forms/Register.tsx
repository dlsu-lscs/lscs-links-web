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

const registerSchema = z.object({
  email: z
    .string()
    .email() // Validates that the string is a valid email format
    .refine((email) => email.endsWith("@dlsu.edu.ph"), {
      message: "Email must end with '@dlsu.edu.ph'",
    }),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const Register = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    const postData = async () => {
      try {
        const response = await axios.post(
          "https://lscs.info/auth/register",
          { email: values.email, password: values.password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        if (response.data.status == "success") {
          window.location.replace("/accessAccount");
        }
      } catch (e) {
        console.log(e);
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
            className="space-y-8 bg-[#030711] border-2 border-[#1D283A] rounded-lg px-24 py-12 flex flex-col"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel className="text-lg">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="juan_delacruz@dlsu.edu.ph"
                        {...field}
                        className="text-black"
                      />
                    </FormControl>
                    <FormDescription>
                      Input DLSU email must include @dlsu.edu.ph
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel className="text-lg">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                        className="text-black"
                      />
                    </FormControl>
                    <FormDescription>
                      Password must be at least 8 characters long
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <Button type="submit" className="bg-[#F8FAFC] text-black">
              Register
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};
