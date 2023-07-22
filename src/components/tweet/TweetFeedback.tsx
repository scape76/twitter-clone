"use client";

import * as React from "react";
import type { Tweet, Like } from "@/db/schema";
import type { User } from "next-auth";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icons";
import { toggleTweetLike } from "@/app/_actions/tweet";
import { TweetContext } from "../TweetContextProvider";

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
    return null;
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
