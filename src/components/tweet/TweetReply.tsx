"use client";

import type * as z from "zod";
import * as React from "react";
import { type User } from "next-auth";
import UserAvatar from "@/components/UserAvatar";
import { Button } from "../ui/Button";
import TweetReplyForm from "../forms/TweetReplyForm";
import { Tweet } from "@/db/schema";

interface TweetReplyProps {
  user: User;
  replyTo: Tweet["id"];
}

const TweetReply: React.FC<TweetReplyProps> = ({ user, replyTo}) => {
  const [isReplying, setIsReplying] = React.useState(false);

  return (
    <div className="flex gap-2 py-2">
      <div>
        <UserAvatar user={{ name: user.name, image: user.image }} />
      </div>
      <div className="flex w-full justify-between gap-2">
        {!isReplying && (
          <>
            <input
              placeholder="Tweet your reply!"
              onFocus={() => setIsReplying(true)}
            />
            <Button>Reply</Button>
          </>
        )}
        {isReplying && (
          <div className="w-full">
            <TweetReplyForm replyTo={replyTo} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TweetReply;
