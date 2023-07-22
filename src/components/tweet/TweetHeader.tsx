import * as React from "react";
import type { Tweet } from "@/db/schema";
import Link from "next/link";
import { cn } from "@/lib/utils";
import TweetTime from "./TweetTime";

interface TweetHeaderProps {
  tweet: Pick<Tweet, "authorId" | "created_at"> & {
    author: {
      name?: string;
      slug?: string;
    };
  };
  isPage?: boolean;
}

const TweetHeader: React.FC<TweetHeaderProps> = ({ tweet, isPage }) => {
  return (
    <div className={cn("flex", { "flex-col": isPage })}>
      <Link href={`/${tweet.authorId}`}>
        <span>{tweet.author.name}</span>{" "}
      </Link>
      {isPage ? (
        <span className="font-thin">{tweet.author.slug}</span>
      ) : (
        <TweetTime createdAt={tweet.created_at} isPage={isPage} />
      )}
    </div>
  );
};

export default TweetHeader;
