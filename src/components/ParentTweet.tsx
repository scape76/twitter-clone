import * as React from "react";
import { type Tweet, type Like, tweets } from "@/db/schema";
import type { User } from "next-auth";
import TweetItem from "./tweet/TweetItem";
import { db } from "@/db";
import { and, eq, sql } from "drizzle-orm";

interface ParentTweetProps {
  parentId: number | null;
  user: User;
  isPage?: boolean;
}

const ParentTweet: React.FC<ParentTweetProps> = async ({
  parentId,
  user,
  isPage,
}) => {
  if (!parentId) return null;

  const parentTweet = await db.query.tweets.findFirst({
    where: eq(tweets.id, parentId),
    with: {
      author: true,
      likes: true,
      replyToTweet: {
        with: {
          author: true,
          likes: true,
          replyToTweet: true,
        },
        extras: {
          replyCount:
            sql<string>`(SELECT COUNT(*) FROM ${tweets} r WHERE r.reply_to_post_id = ${tweets.id})`.as(
              "reply_count"
            ),
        },
      },
    },
    extras: {
      replyCount:
        sql<string>`(SELECT COUNT(*) FROM ${tweets} r WHERE r.reply_to_post_id = ${tweets.id})`.as(
          "reply_count"
        ),
    },
  });

  if (!parentTweet) return null;

  // if (!parentTweet)
  //   return (
  //     <ParentTweet parentId={parentTweet.id} user={user} isPage={isPage} />
  //   );
  return (
    <>
      <ParentTweet parentId={parentTweet.replyToTweetId} user={user} isPage={isPage} />
      <TweetItem tweet={parentTweet} user={user} isPage={isPage} />
    </>
  );
};

export default ParentTweet;
