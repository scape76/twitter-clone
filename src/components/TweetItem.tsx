"use client";

import * as React from "react";
import { type Tweet } from "@/db/schema";
import type { User } from "next-auth";
import Link from "next/link";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import TweetOperations from "./TweetOperations";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { getUserLiterals } from "@/lib/utils";

dayjs.extend(relativeTime);

interface TweetItemProps {
  tweet: Tweet & { author: User | null };
  user: User;
}

function TweetItem({ tweet, user }: TweetItemProps) {
  return (
    <div className="relative">
      <Link href={`/${tweet.authorId}/${tweet.id}`}>
        <div className="flex gap-2 border-b border-border p-2 hover:bg-zinc-100">
          <Link href={`/${tweet.authorId}`}>
            <div>
              <Avatar>
                <AvatarImage src={user.image ?? undefined} />
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
          </div>
        </div>
        {user.id === tweet.authorId && (
          <TweetOperations tweetId={tweet.id} userId={user.id} />
        )}
      </Link>
    </div>
  );
}

export default TweetItem;
