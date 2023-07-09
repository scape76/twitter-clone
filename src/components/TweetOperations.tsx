"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Icons, Spinner } from "./Icons";
import { type Tweet } from "@/db/schema";
import { type User } from "next-auth";
import { deleteTweetAction } from "@/app/_actions/tweet";
import { toast } from "./ui/use-toast";
import { buttonVariants } from "./ui/Button";

interface TweetOperationsProps {
  tweetId: Tweet["id"];
  userId: User["id"];
}

const TweetOperations: React.FC<TweetOperationsProps> = ({
  tweetId,
  userId,
}) => {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={buttonVariants({
            size: "icon",
            variant: "ghost",
            className: "absolute right-0 top-0",
          })}
        >
          <Icons.horizontalDots className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="cursor-pointer text-destructive"
            onClick={() => setOpen(true)}
          >
            <Icons.trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog onOpenChange={setOpen} open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isLoading}
              // eslint-disable-next-line
              onClick={async () => {
                try {
                  setIsLoading(true);
                  await deleteTweetAction({ id: tweetId, userId });

                  setOpen(false);

                  toast({
                    title: "Success",
                    description: "Your tweet was deleted.",
                  });
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
                } finally {
                  setIsLoading(false);
                }
              }}
            >
              {isLoading ? <Spinner /> : null}
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TweetOperations;
