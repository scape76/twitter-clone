import * as React from "react";
import type { Tweet, Like } from "@/db/schema";
import type { User } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { cn, getUserLiterals } from "@/lib/utils";
import TweetHeader from "./TweetHeader";

interface TweetShellProps {
  tweet: Tweet & { author: User } & { likes: Like[] } & { replyCount: string };
  user: User;
  isPage?: boolean;
  children: React.ReactNode;
}

const TweetShell = ({ tweet, user, isPage, children }: TweetShellProps) => {
  return (
    <div
      className={cn("relative flex flex-col gap-2 border-b border-border p-2", {
        "hover:bg-accent": !isPage,
      })}
    >
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
