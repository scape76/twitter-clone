import { db } from "@/db";
import * as React from "react";
import UserAvatar from "./UserAvatar";
import { Tweet, User } from "@/db/schema";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import Link from "next/link";
import { Icons } from "./Icons";

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

function PostItem(t: Tweet & { author: User | null }) {
  return (
    <Link href={`/${t.authorId}/${t.id}`}>
      <div className="flex gap-2 p-2 border-b border-border hover:bg-zinc-100">
        <div>
          <UserAvatar user={{ name: t.author?.name, image: t.author?.image }} />
        </div>
        <div className="w-full">
          <div className="flex justify-between">
            <div>
              <span>{t.author?.name}</span>{" "}
              <span className="font-thin">{` · ${dayjs(
                t.created_at
              ).fromNow()}`}</span>
            </div>
            <Icons.horizontalDots className="h-4 w-4" />
          </div>
          {t.text}
        </div>
      </div>
    </Link>
  );
}

export default Feed;
