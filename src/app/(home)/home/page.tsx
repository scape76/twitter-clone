import { db } from "@/db";
import { getCurrentUser } from "@/lib/session";
import * as React from "react";
import TweetContextProvider from "@/components/TweetContext";
import NewTweetForm from "@/components/forms/NewTweetForm";
import Feed from "@/components/Feed";

export default async function HomePage({}) {
  const user = await getCurrentUser();

  if (!user) return null;

  return (
    <div>
      <div className="sticky top-0 z-50 w-full border-b border-border bg-background/90 p-2 text-xl font-bold">
        Home
      </div>
      <TweetContextProvider>
        <NewTweetForm user={user} />
        <Feed user={user} />
      </TweetContextProvider>
    </div>
  );
}
