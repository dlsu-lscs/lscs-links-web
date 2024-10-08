import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useCookies } from "react-cookie";

const linkSchema = z.object({
  longLink: z.string(),
  shortLink: z.string(),
});

type editLink = {
  linkID: string;
};

export const EditLink = ({ linkID }: editLink) => {
  const [currentToken] = useCookies(["currentToken"]);
  const token = currentToken.currentToken;

  const form = useForm<z.infer<typeof linkSchema>>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      longLink: "",
      shortLink: "",
    },
  });
  console.log(linkID);

  const onSubmit = (values: z.infer<typeof linkSchema>) => {
    console.log(values);
    const editData = async () => {
      try {
        const response = await axios.put(
          "https://lscs.info/admin/links/" + linkID,
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

  const onDelete = () => {
    console.log(linkID);
    const deleteData = async () => {
      try {
        const response = await axios.delete(
          "https://lscs.info/admin/links/" + linkID,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.status == "ok") {
          window.location.replace("/");
        }
      } catch (e) {
        console.log(e);
      }
    };
    deleteData();
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
                        <div className="flex space-x-1">
                          <FormControl>
                            <Input
                              {...field}
                              disabled
                              value={"lscs.info/"}
                              className="text-white bg-[#333437] border-2 border-[#1D283A] rounded-l-lg w-1/4"
                            />
                          </FormControl>
                          <FormControl>
                            <Input
                              {...field}
                              className="text-white bg-[#030711] border-2 border-[#1D283A] rounded-lg"
                            />
                          </FormControl>
                        </div>
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
                <div className="space-x-6 flex justify-between items-center">
                  <div className="space-x-6">
                    <AlertDialogAction
                      type="submit"
                      className="text-black bg-white"
                    >
                      Continue
                    </AlertDialogAction>
                    <AlertDialogCancel className="bg-transparent border-transparent text-white">
                      Cancel
                    </AlertDialogCancel>
                  </div>
                  <div>
                    <AlertDialog>
                      <AlertDialogTrigger className="bg-red-500 rounded-full p-2 text-white">
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
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="space-y-8 bg-[#030711] border-2 border-[#1D283A] rounded-lg px-8 py-6 flex flex-col">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your link from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={onDelete}
                            className="bg-red-500"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
