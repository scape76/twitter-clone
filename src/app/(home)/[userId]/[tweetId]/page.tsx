import TweetFeedback from "@/components/tweet/TweetFeedback";
import TweetItem from "@/components/tweet/TweetItem";
import { db } from "@/db";
import { tweets } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";
import { and, eq, sql } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import * as React from "react";

interface TweetPageProps {
  params: {
    userId: string;
    tweetId: string;
  };
}

const TweetPage: React.FC<TweetPageProps> = async ({ params }) => {
  const tweetId = Number(params.tweetId);

  const tweet = await db.query.tweets.findFirst({
    where: and(eq(tweets.id, tweetId), eq(tweets.authorId, params.userId)),
    with: {
      author: true,
      likes: true,
      replyToTweet: {
        with: {
          author: true,
          likes: true,
          replyToTweet: true,
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

  const replies = await db.query.tweets.findMany({
    where: eq(tweets.replyToTweetId, tweetId),
    with: {
      author: true,
      likes: true,
    },
    extras: {
      replyCount:
        sql<string>`(SELECT COUNT(*) FROM ${tweets} r WHERE r.reply_to_post_id = ${tweets.id})`.as(
          "reply_count"
        ),
    },
  });

  console.log(replies);

  if (!tweet) notFound();

  const user = await getCurrentUser();

  if (!user) redirect("/login");

  return (
    <>
      {/* <TweetItem tweet={tweet.replyToTweet} user={user} isPage={false} /> */}
      <TweetItem tweet={tweet} user={user} isPage={true} />
      <div>
        {replies.map((r) => {
          return <TweetItem tweet={r} user={user} isPage={false} />;
        })}
      </div>
    </>
  );
};

export default TweetPage;
