"use server";

import { type User } from "next-auth";
import { db } from "@/db";
import { tweets } from "@/db/schema";
import { revalidatePath } from "next/cache";

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
