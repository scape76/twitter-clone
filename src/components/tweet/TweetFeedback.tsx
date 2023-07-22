"use client";

import * as React from "react";
import type { Tweet, Like } from "@/db/schema";
import type { User } from "next-auth";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icons";
import { toggleTweetLike } from "@/app/_actions/tweet";
import { TweetContext } from "../TweetContextProvider";
import TweetReply from "./TweetReply";

interface TweetFeedbackProps {
  tweet: Tweet & { author: User } & { likes: Like[] } & { replyCount: string };
  user: User;
  isPage?: boolean;
}

const TweetFeedback: React.FC<TweetFeedbackProps> = ({
  tweet,
  user,
  isPage,
}) => {
  const context = React.useContext(TweetContext);

  const [isPending, startTransition] = React.useTransition();

  if (isPage) {
    return (
      <div className="flex flex-col">
        <hr className="w-full border-b border-border" />
        <div className="flex items-center gap-2 py-2 text-muted-foreground">
          <span>
            <span className="text-accent-foreground">{tweet.likes.length}</span>{" "}
            Likes
          </span>
          <span>
            <span className="text-accent-foreground">{tweet.replyCount}</span>{" "}
            Comments
          </span>
        </div>
        <hr className="w-full border-b border-border" />
        <div className="flex items-center gap-4 py-2 text-muted-foreground">
          <Icons.like
            className={cn("h-6 w-6 cursor-pointer hover:text-red-500", {
              "text-red-500 hover:text-main": tweet.likes.some(
                (like) => like.authorId === user.id
              ),
            })}
            onClick={(e) => {
              if (isPending) return;
              startTransition(() => {
                e.preventDefault();
                console.log("like");
              });
            }}
          />
          <Icons.comment className="h-6 w-6 cursor-pointer hover:text-main" />
        </div>
        <hr className="w-full border-b border-border" />
        <TweetReply user={user} replyTo={tweet.id} />
      </div>
    );
  }

  return (
    <div className="group mt-2 flex gap-4">
      <div className="flex gap-2">
        <Icons.like
          className={cn("h-4 w-4 hover:text-red-500", {
            "text-red-500 hover:text-main": tweet.likes.some(
              (like) => like.authorId === user.id
            ),
          })}
          onClick={(e) => {
            if (isPending) return;
            startTransition(async () => {
              e.preventDefault();
              await toggleTweetLike({ id: tweet.id, userId: user.id });
              context?.setRefetch(true);
            });
          }}
        />
        <span className="align-bottom text-xs text-muted-foreground">
          {tweet.likes.length}
        </span>
      </div>
      <div className="flex gap-2">
        <Icons.comment className="h-4 w-4 hover:text-main" />
        <span className="align-bottom text-xs text-muted-foreground">
          {tweet.replyCount}
        </span>
      </div>
    </div>
  );
};

export default TweetFeedback;
