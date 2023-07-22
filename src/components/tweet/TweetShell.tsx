import * as React from "react";
import type { Tweet, Like } from "@/db/schema";
import type { User } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { cn, getUserLiterals } from "@/lib/utils";
import TweetHeader from "./TweetHeader";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

interface TweetShellProps {
  tweet: Tweet & { author: User } & { likes: Like[] } & { replyCount: string };
  user: User;
  isPage?: boolean;
  children: React.ReactNode;
}

const TweetShell = ({ tweet, user, isPage, children }: TweetShellProps) => {
  return (
    <div className="flex flex-col gap-2 relative border-b border-border p-2 hover:bg-accent">
      <div className="flex items-center gap-2">
        <div className={cn({ "self-start": !isPage })}>
          <Avatar>
            <AvatarImage src={tweet.author?.image ?? undefined} />
            <AvatarFallback>{getUserLiterals(user.name)}</AvatarFallback>
          </Avatar>
        </div>
        {isPage && (
          <TweetHeader
            tweet={{
              authorId: tweet.authorId,
              created_at: tweet.created_at,
              author: {
                name: tweet.author.name ?? undefined,
                slug: tweet.author.email ?? undefined,
              },
            }}
            isPage={isPage}
          />
        )}
        <div>
          {!isPage && (
            <TweetHeader
              tweet={{
                authorId: tweet.authorId,
                created_at: tweet.created_at,
                author: {
                  name: tweet.author.name ?? undefined,
                  slug: tweet.author.email ?? undefined,
                },
              }}
              isPage={isPage}
            />
          )}
          {!isPage && children}
        </div>
      </div>
      {isPage && children}
    </div>
  );
};

export default TweetShell;
