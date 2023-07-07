import { db } from "@/db";
import * as React from "react";
import UserAvatar from "./UserAvatar";
import { Tweet, User } from "@/db/schema";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import Link from "next/link";
import { Icons } from "./Icons";
import PostOperations from "./PostOperations";
import { Button } from "./ui/Button";
import { getCurrentUser } from "@/lib/session";

dayjs.extend(relativeTime);

const Feed: React.FC = async ({}) => {
  // get the tweets data
  // depending on users follows

  const tweets = await db.query.tweets.findMany({ with: { author: true } });

  return (
    <div>
      {tweets.map((t) => (
        <PostItem {...t} key={t.id} />
      ))}
    </div>
  );
};

async function PostItem(t: Tweet & { author: User | null }) {
  const user = await getCurrentUser();

  if (!user) return null;

  return (
    <div className="relative">
      <Link href={`/${t.authorId}/${t.id}`}>
        <div className="flex gap-2 border-b border-border p-2 hover:bg-zinc-100">
          <div>
            <UserAvatar
              user={{ name: t.author?.name, image: t.author?.image }}
            />
          </div>
          <div className="w-full">
            <div className="flex justify-between">
              <div>
                <span>{t.author?.name}</span>{" "}
                <span className="font-thin">{` · ${dayjs(
                  t.created_at
                ).fromNow()}`}</span>
              </div>
            </div>
            <span className="max-w-full text-clip break-all">{t.text}</span>
          </div>
        </div>
      </Link>
      <Button
        size={"icon"}
        variant={"ghost"}
        className="absolute right-0 top-0"
      >
        <PostOperations tweetId={t.id} userId={user.id} />
      </Button>
    </div>
  );
}

export default Feed;
