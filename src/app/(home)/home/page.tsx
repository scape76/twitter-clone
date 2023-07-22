import { getCurrentUser } from "@/lib/session";
import * as React from "react";
import TweetContextProvider from "@/components/TweetContextProvider";
import NewTweetForm from "@/components/forms/NewTweetForm";
import Feed from "@/components/Feed";
import Header from "@/components/layout/Header";
import UserAvatar from "@/components/UserAvatar";

export default async function HomePage({}) {
  const user = await getCurrentUser();

  if (!user) return null;

  return (
    <div>
      <Header title={"Home"} />
      <TweetContextProvider>
        <div className="flex gap-2 border-b border-border p-2">
          <div>
            <UserAvatar user={{ name: user.name, image: user.image }} />
          </div>
          <div className="w-full">
            <NewTweetForm user={user} />
          </div>
        </div>
        <Feed user={user} />
      </TweetContextProvider>
    </div>
  );
}
