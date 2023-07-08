"use client";

import * as React from "react";
import UserAvatar from "./UserAvatar";
import { Tweet } from "@/db/schema";
import type { User } from "next-auth";
import Link from "next/link";
import { Button } from "./ui/Button";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);

interface TweetItemProps {
  tweet: Tweet & { author: User | null };
  user: User;
}

function TweetItem({ tweet, user }: TweetItemProps) {
  return (
    <div className="relative">
      {/* eslint-disable-next-line */}
      <Link href={`/${tweet.authorId}/${tweet.id}`}>
        <div className="flex gap-2 border-b border-border p-2 hover:bg-zinc-100">
          <div>
            <UserAvatar
              user={{ name: tweet.author?.name, image: tweet.author?.image }}
            />
          </div>
          <div className="w-full">
            <div className="flex justify-between">
              <div>
                <span>{tweet.author?.name}</span>{" "}
                {/* <span className="font-thin">{` · ${dayjs(
                  t.created_at
                ).fromNow()}`}</span> */}
              </div>
            </div>
            <span className="max-w-full text-clip break-all">{tweet.text}</span>
          </div>
        </div>
      </Link>
      <Button
        size={"icon"}
        variant={"ghost"}
        className="absolute right-0 top-0"
      >
        {/* TODO: weird bug with react server bundler */}
        {/* <TweetOperations tweetId={t.id} userId={user.id} /> */}
      </Button>
    </div>
  );
}

export default TweetItem;
