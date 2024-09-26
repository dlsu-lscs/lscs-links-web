import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useFetch } from "@/hooks/useFetch";

const linkSchema = z.object({
  longLink: z.string(),
  shortLink: z.string(),
});

export const EditLink = (linkID: string) => {
  const [currentToken] = useCookies(["currentToken"]);
  const token = currentToken.currentToken;

  const { data, loading, error } = useFetch(
    `https://lscs.info/admin/link/${linkID.linkID}`,
    token
  );

  const form = useForm<z.infer<typeof linkSchema>>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      longLink: "",
      shortLink: "",
    },
  });

  const onSubmit = (values: z.infer<typeof linkSchema>) => {
    console.log(values);
    const editData = async () => {
      try {
        const response = await axios.put(
          "https://lscs.info/admin/links/" + linkID.linkID,
          { longlink: values.longLink, shortlink: values.shortLink },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        if (response.data.status == "ok") {
          window.location.replace("/");
        }
      } catch (e) {
        console.log(e);
      }
    };
    editData();
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-transparent border-none">
          <p className="font-bold text-3xl text-white px-8">Edit Short Link</p>
          <div className="space-y-8 bg-[#030711] border-2 border-[#1D283A] rounded-lg px-8 py-6 flex flex-col">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 flex flex-col"
              >
                <FormField
                  control={form.control}
                  name="shortLink"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel className="text-white">Short Link</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="text-white bg-[#030711] border-2 border-[#1D283A] rounded-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  control={form.control}
                  name="longLink"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel className="text-white">Long Link</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="text-white bg-[#030711] border-2 border-[#1D283A] rounded-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <div className="space-x-6">
                  <AlertDialogAction
                    type="submit"
                    className="text-black bg-white"
                  >
                    Continue
                  </AlertDialogAction>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </div>
              </form>
            </Form>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
