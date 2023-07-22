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
import TweetTime from "./TweetTime";

interface TweetItemProps {
  tweet: Tweet & { author: User } & { likes: Like[] } & { replyCount: string };
  user: User;
  isPage?: boolean;
}

function TweetItem({ tweet, user, isPage }: TweetItemProps) {
  const tweetContent = (
    <TweetShell tweet={tweet} user={user} isPage={isPage}>
      <span
        className={cn("max-w-full text-clip break-all", {
          "text-xl": isPage,
        })}
      >
        {tweet.text}
      </span>
      {!isPage && <TweetFeedback tweet={tweet} user={user} isPage={isPage} />}
      {isPage && <TweetTime createdAt={tweet.created_at} isPage={isPage} />}
      {user.id === tweet.authorId && (
        <TweetOperations tweetId={tweet.id} userId={user.id} />
      )}
      {isPage && <TweetFeedback tweet={tweet} user={user} isPage={isPage} />}
    </TweetShell>
  );

  return isPage ? (
    tweetContent
  ) : (
    <Link href={`/${tweet.authorId}/${tweet.id}`}>{tweetContent}</Link>
  );
}

export default TweetItem;
