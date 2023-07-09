"use client";

import * as React from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from "@/hooks/use-intersection";
import { getTweetsByCursor } from "@/app/_actions/tweet";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
// import TweetOperations from "./TweetOperations";
import { Button } from "./ui/Button";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { User } from "next-auth";
import { TweetContext } from "@/components/TweetContextProvider";
import { Spinner } from "./Icons";
import TweetOperations from "./TweetOperations";
import TweetItem from "./TweetItem";

dayjs.extend(relativeTime);

interface FeedProps {
  user: User;
}

const Feed = ({ user }: FeedProps) => {
  const context = React.useContext(TweetContext);

  const { data, fetchNextPage, isLoading, hasNextPage, refetch } =
    useInfiniteQuery(
      ["query"],
      async ({ pageParam: cursor = undefined }) => {
        const data = await getTweetsByCursor({ cursor });
        return data;
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor;
        },
      }
    );

  if (context?.refetch) {
    refetch();
    context.setRefetch(false);
  }

  const cursorRef = React.useRef<HTMLDivElement>(null);

  const { ref, entry } = useIntersection({
    root: cursorRef.current,
    threshold: 1,
  });

  React.useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) void fetchNextPage();
  }, [entry, hasNextPage, fetchNextPage]);

  const pageInfo = data?.pages.flatMap((p) => p);

  if (isLoading) {
    return <Spinner className="mx-auto mt-10 h-24 w-24 text-gray-400" />;
  }

  return (
    <div>
      {pageInfo?.map(({ tweets, nextCursor }) =>
        tweets.map((tweet) => {
          if (tweet.id === nextCursor) {
            return (
              <div ref={ref} key={tweet.id}>
                <TweetItem tweet={tweet} user={user} />
              </div>
            );
          }
          return <TweetItem tweet={tweet} user={user} />;
        })
      )}
    </div>
  );
};

export default Feed;
