"use server";

import { type User } from "next-auth";
import { db } from "@/db";
import { Tweet, tweets } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { and, desc, eq } from "drizzle-orm";

export async function postTweetAction(input: {
  text: string;
  userId: User["id"];
}) {
  if (typeof input.text !== "string") {
    throw new Error("Invalid input.");
  }

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

  if (typeof input.id !== "number" || typeof input.userId !== "string") {
    throw new Error("Invalid input.");
  }

  const isAuthor = await db.transaction(async (tx) => {
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

const numberOfTweets = 10;

export async function getTweetsByPage(input: { page?: number }) {
  if (typeof input.page !== "number") {
    throw new Error("Invalid input.");
  }

  const offset = (input.page - 1) * numberOfTweets;

  const _tweets = await db.query.tweets.findMany({
    limit: numberOfTweets + 1,
    offset,
    orderBy: desc(tweets.created_at),
    with: {
      author: true,
    },
  });

  return {
    tweets: _tweets.slice(0, numberOfTweets),
    nextPage: _tweets.length === numberOfTweets + 1 ? input.page + 1 : null,
  };
}
