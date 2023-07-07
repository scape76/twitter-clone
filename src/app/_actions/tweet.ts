"use server";

import { type User } from "next-auth";
import { db } from "@/db";
import { Tweet, tweets } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";

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

  revalidatePath("/home");
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

  revalidatePath("/home");
}
