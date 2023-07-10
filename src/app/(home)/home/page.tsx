import { getCurrentUser } from "@/lib/session";
import * as React from "react";
import TweetContextProvider from "@/components/TweetContextProvider";
import NewTweetForm from "@/components/forms/NewTweetForm";
import Feed from "@/components/Feed";
import Header from "@/components/layout/Header";

export default async function HomePage({}) {
  const user = await getCurrentUser();

  if (!user) return null;

  return (
    <div>
      <Header title={'Home'}/>
      <TweetContextProvider>
        <NewTweetForm user={user} />
        <Feed user={user} />
      </TweetContextProvider>
    </div>
  );
}
