"use client";

import * as React from "react";
import type { Tweet, Like } from "@/db/schema";
import type { User } from "next-auth";
import Link from "next/link";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import TweetOperations from "./TweetOperations";
import { cn } from "@/lib/utils";
import TweetShell from "./TweetShell";
import TweetFeedback from "./TweetFeedback";

dayjs.extend(relativeTime);

interface TweetItemProps {
  tweet: Tweet & { author: User } & { likes: Like[] } & { replyCount: string };
  user: User;
  isPage?: boolean;
}

function TweetItem({ tweet, user, isPage }: TweetItemProps) {
  return (
    <Link href={`/${tweet.authorId}/${tweet.id}`}>
      <TweetShell tweet={tweet} user={user} isPage={isPage}>
        <span
          className={cn("max-w-full text-clip break-all", {
            "text-xl": isPage,
          })}
        >
          {tweet.text}
        </span>
        <TweetFeedback tweet={tweet} user={user} isPage={isPage}/>
        {isPage && (
          <span className="font-thin">{`${dayjs(tweet.created_at).format(
            "LT"
          )}  · ${dayjs(tweet.created_at).format("ll")}`}</span>
        )}
        {user.id === tweet.authorId && (
          <TweetOperations tweetId={tweet.id} userId={user.id} />
        )}
      </TweetShell>
    </Link>
  );
}

export default TweetItem;
