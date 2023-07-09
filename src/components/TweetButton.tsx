"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import NewTweetForm from "@/components/forms/NewTweetForm";
import type { User } from "next-auth";

interface TweetButtonProps {
  user: User;
}

const TweetButton: React.FC<TweetButtonProps> = ({ user }) => {
  const [isOpened, setIsOpened] = React.useState(false);

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <Button>Tweet</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a tweet.</DialogTitle>
        </DialogHeader>
        <NewTweetForm user={user} setIsOpenedModal={setIsOpened} />
      </DialogContent>
    </Dialog>
  );
};

export default TweetButton;
