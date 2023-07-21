"use server";

import { type User } from "next-auth";
import { db } from "@/db";
import { type Tweet, tweets, likes } from "@/db/schema";
import { and, desc, eq, isNull, lt, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function postTweetAction(input: {
  text: string;
  userId: User["id"];
}) {
  await db.insert(tweets).values({
    text: input.text,
    authorId: input.userId,
  });
}

export async function deleteTweetAction(input: {
  id: Tweet["id"];
  userId: User["id"];
}) {
  // validate if user is an author
  // delete the post

  const isAuthor = await db.transaction(async (_tx) => {
    const founded = await db.query.tweets.findFirst({
      where: and(eq(tweets.id, input.id), eq(tweets.authorId, input.userId)),
    });
    await db
      .delete(tweets)
      .where(and(eq(tweets.id, input.id), eq(tweets.authorId, input.userId)));

    return !!founded;
  });

  if (!isAuthor) {
    throw new Error("You have no permissions to delete this post.");
  }
}

const numberOfTweets = 5;

export async function getTweetsByCursor(input: { cursor?: number }) {
  if (!input.cursor) {
    const _tweets = await db.query.tweets.findMany({
      limit: numberOfTweets,
      orderBy: desc(tweets.created_at),
      with: {
        author: true,
        likes: true,
        replyToTweet: true,
      },
      where: isNull(tweets.replyToTweetId),
      extras: {
        replyCount:
          sql<string>`(SELECT COUNT(*) FROM ${tweets} r WHERE r.reply_to_post_id = ${tweets.id})`.as(
            "reply_count"
          ),
      },
    });

    const nextCursor = _tweets[numberOfTweets - 1]?.id;

    return {
      tweets: _tweets,
      nextCursor,
    };
  }

  if (typeof input.cursor !== "number") {
    throw new Error("Invalid input.");
  }
  const _tweets = await db.query.tweets.findMany({
    orderBy: desc(tweets.created_at),
    limit: numberOfTweets,
    with: {
      author: true,
      likes: true,
      replyToTweet: true,
    },
    where: and(lt(tweets.id, input.cursor), isNull(tweets.replyToTweetId)),
    extras: {
      replyCount:
        sql<string>`(SELECT COUNT(*) FROM ${tweets} r WHERE r.reply_to_post_id = ${tweets.id})`.as(
          "reply_count"
        ),
    },
  });

  const nextCursor = _tweets[numberOfTweets - 1]?.id;

  return {
    tweets: _tweets,
    nextCursor,
  };

  // offset based

  // const _tweets = await db.query.tweets.findMany({
  //   limit: numberOfTweets + 1,
  //   offset,
  //   orderBy: desc(tweets.created_at),
  //   with: {
  //     author: true,
  //   },
  // });

  // return {
  //   tweets: _tweets.slice(0, numberOfTweets),
  //   nextPage: _tweets.length === numberOfTweets + 1 ? input.page + 1 : null,
  // };
}

export async function toggleTweetLike(input: {
  id: Tweet["id"];
  userId: User["id"];
}) {
  // see if the user liked it or no
  // depending on that state change set / remove like

  // 1. check if the tweet exists

  const tweet = await db.query.tweets.findFirst({
    where: eq(tweets.id, input.id),
  });

  if (!tweet) {
    throw new Error("Tweet doesnt exist.");
  }

  const likedTweet = await db.query.likes.findFirst({
    where: and(eq(likes.tweetId, input.id), eq(likes.authorId, input.userId)),
  });

  if (!likedTweet) {
    await db.insert(likes).values({
      authorId: input.userId,
      tweetId: input.id,
    });
  } else {
    await db
      .delete(likes)
      .where(
        and(eq(likes.tweetId, input.id), eq(likes.authorId, input.userId))
      );
  }
}
