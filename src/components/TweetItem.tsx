"use client";

import * as React from "react";
import type { Tweet, Like } from "@/db/schema";
import type { User } from "next-auth";
import Link from "next/link";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import TweetOperations from "./TweetOperations";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { cn, getUserLiterals } from "@/lib/utils";
import { Button } from "./ui/Button";
import { Icons } from "./Icons";
import { toggleTweetLike } from "@/app/_actions/tweet";
import { TweetContext } from "./TweetContextProvider";

dayjs.extend(relativeTime);

interface TweetItemProps {
  tweet: Tweet & { author: User | null } & { likes: Like[] };
  user: User;
}

function TweetItem({ tweet, user }: TweetItemProps) {
  const context = React.useContext(TweetContext);

  const [isPending, startTransition] = React.useTransition();

  return (
    <Link href={`/${tweet.authorId}/${tweet.id}`}>
      <div className="relative border-b border-border p-2 hover:bg-accent">
        <div className="flex gap-2">
          <Link href={`/${tweet.authorId}`}>
            <div>
              <Avatar>
                <AvatarImage src={tweet.author?.image ?? undefined} />
                <AvatarFallback>{getUserLiterals(user.name)}</AvatarFallback>
              </Avatar>
            </div>
          </Link>
          <div className="w-full">
            <div className="flex justify-between">
              <div>
                <Link href={`/${tweet.authorId}`}>
                  <span>{tweet.author?.name}</span>{" "}
                </Link>
                <span className="font-thin">{` · ${dayjs(
                  tweet.created_at
                ).fromNow()}`}</span>
              </div>
            </div>
            <span className="max-w-full text-clip break-all">{tweet.text}</span>
            <div
              className="group flex justify-between rounded-full p-1 group-hover:bg-main"
              onClick={(e) => {
                if (isPending) return;
                startTransition(async () => {
                  e.preventDefault();
                  await toggleTweetLike({ id: tweet.id, userId: user.id });
                  context?.setRefetch(true);
                });
              }}
            >
              <div className="flex gap-2">
                <Icons.like
                  className={cn("h-4 w-4 hover:text-red-500", {
                    "text-red-500 hover:text-main": tweet.likes.some(
                      (like) => like.authorId === user.id
                    ),
                  })}
                />
                <span className="text-xs text-muted-foreground align-bottom">{tweet.likes.length}</span>
              </div>
            </div>
          </div>
        </div>
        {user.id === tweet.authorId && (
          <TweetOperations tweetId={tweet.id} userId={user.id} />
        )}
      </div>
    </Link>
  );
}

export default TweetItem;
