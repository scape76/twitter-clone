import Header from "@/components/layout/Header";
import { db } from "@/db";
import { users, tweets } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { getUserLiterals, updateImageUrl } from "@/lib/utils";
import TweetItem from "@/components/TweetItem";
import { getCurrentUser } from "@/lib/session";

interface UserPageProps {
  params: {
    userId: string;
  };
}

const UserPage: React.FC<UserPageProps> = async ({ params }) => {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  const author = await db.query.users.findFirst({
    where: eq(users.id, params.userId),
  });

  if (!author) notFound();

  const authorTweets = await db.query.tweets.findMany({
    where: eq(tweets.authorId, author.id),
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

  return (
    <div>
      <Header title={author.name ?? ""} />
      <div className="relative h-36 bg-accent">
        <Avatar className="absolute bottom-0 left-0 -mb-[64px] ml-4 h-32 w-32 rounded-full border-4 border-background">
          <AvatarImage src={updateImageUrl(author.image ?? "", 216)} />
          <AvatarFallback>{getUserLiterals(author.name)}</AvatarFallback>
        </Avatar>
      </div>
      <div className="h-[64px]" />
      <hr className="w-full border-b border-border" />
      <div>
        {authorTweets.map((t) => (
          <TweetItem tweet={t} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserPage;
