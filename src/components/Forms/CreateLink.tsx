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

const linkSchema = z.object({
  longLink: z.string(),
  shortLink: z.string(),
});

export const CreateLink = () => {
  const [currentToken] = useCookies(["currentToken"]);
  const token = currentToken.currentToken;

  const form = useForm<z.infer<typeof linkSchema>>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      longLink: "",
      shortLink: "",
    },
  });

  const onSubmit = (values: z.infer<typeof linkSchema>) => {
    console.log(values);
    const postData = async () => {
      try {
        const response = await axios.post(
          "https://lscs.info/admin/create",
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
    postData();
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="outline" className="text-black">
            Create New
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-transparent border-none">
          <p className="font-bold text-3xl text-white px-8">
            Create Short Link
          </p>
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
                            placeholder="lscs"
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
                            placeholder="lscsinfo/"
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
