import LogoutButton from "@/components/LogoutButton";
import NewTweetForm from "@/components/forms/NewTweetForm";
import { db } from "@/db";
import { getCurrentUser } from "@/lib/session";
import * as React from "react";

export default async function HomePage({}) {
  const user = await getCurrentUser();

  if (!user) return null;

  // get the tweets data
  // depending on users follows

  const tweets = await db.query.tweets.findMany();

  return (
    <div>
      <div className="sticky w-full border-b border-border bg-background/90 p-2 text-xl font-bold">
        Home
      </div>
      <NewTweetForm user={user} />
      <div className="w-full">
        {tweets.map((t) => (
          <div key={t.id}>{t.text}</div>
        ))}
      </div>
    </div>
  );
}
