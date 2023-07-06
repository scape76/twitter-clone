"use client";

import * as React from "react";

import { User } from "next-auth";
import UserAvatar from "@/components/UserAvatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/Button";
import { Icons, Spinner } from "../Icons";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { tweetSchema } from "@/lib/validations/tweet";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "../ui/use-toast";
import { postTweetAction } from "@/app/_actions/tweet";

type Inputs = z.infer<typeof tweetSchema>;

interface NewTweetFormProps {
  user: User;
}

const NewTweetForm: React.FC<NewTweetFormProps> = ({ user }) => {
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<Inputs>({
    resolver: zodResolver(tweetSchema),
    defaultValues: {
      text: "",
    },
  });

  function onSubmit(values: Inputs) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    startTransition(async () => {
      try {
        await postTweetAction({ userId: user.id, text: values.text });

        form.reset();

        toast({ title: "Success", description: "Tweet posted succesfully." });
      } catch (e) {
        e instanceof Error
          ? toast({
              title: "Error",
              description: e.message,
              variant: "destructive",
            })
          : toast({
              title: "Error",
              description: "Something went wrong, please try again.",
              variant: "destructive",
            });
      }
    });
    console.log(values);
  }

  return (
    <div className="flex gap-2 border-b border-border p-2">
      <div>
        <UserAvatar user={{ name: user.name, image: user.image }} />
      </div>
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="What is happening?!"
                      className="border-none text-lg font-semibold outline-none"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <Button type="button" size={"icon"} variant={"ghost"}>
                <Icons.smile className="h-4 w-4 text-main" />
              </Button>
              <Button type="submit" className="ml-auto" disabled={isPending}>
                {isPending ? <Spinner className="mr-2 h-4 w-4" /> : null}
                Tweet
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewTweetForm;