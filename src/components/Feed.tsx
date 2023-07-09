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
import { TweetContext } from "@/components/TweetContext";

dayjs.extend(relativeTime);

interface FeedProps {
  user: User;
}

const Feed = ({ user }: FeedProps) => {
  const context = React.useContext(TweetContext);

  const { data, fetchNextPage, isFetching, hasNextPage, refetch } =
    useInfiniteQuery(
      ["query"],
      async ({ pageParam: cursor = undefined }) => {
        // eslint-disable-next-line
        const data = await getTweetsByCursor({ cursor });
        return data;
      },
      {
        getNextPageParam: (lastPage, pages) => {
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
    console.log("here");

    if (entry?.isIntersecting && hasNextPage) void fetchNextPage();
  }, [entry]);

  const pageInfo = data?.pages.flatMap((p) => p);

  return (
    <div>
      {pageInfo?.map(({ tweets, nextCursor }) =>
        tweets.map((tweet, idx) => {
          if (tweet.id === nextCursor) {
            return (
              // eslint-disable-next-line
              <div ref={ref} key={tweet.id}>
                <div className="relative">
                  {/* eslint-disable-next-line */}
                  <Link href={`/${tweet.authorId}/${tweet.id}`}>
                    <div className="flex gap-2 border-b border-border p-2 hover:bg-zinc-100">
                      <div>
                        <UserAvatar
                          user={{
                            name: tweet.author?.name,
                            image: tweet.author?.image,
                          }}
                        />
                      </div>
                      <div className="w-full">
                        <div className="flex justify-between">
                          <div>
                            <span>{tweet.author?.name}</span>{" "}
                            <span className="font-thin">{` · ${dayjs(
                              tweet.created_at
                            ).fromNow()}`}</span>
                          </div>
                        </div>
                        <span className="max-w-full text-clip break-all">
                          {tweet.text}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    className="absolute right-0 top-0"
                  >
                    {/* TODO: weird bug with react server bundler */}
                    {/* <TweetOperations tweetId={t.id} userId={user.id} /> */}
                  </Button>
                </div>
              </div>
            );
          }
          return (
            <div className="relative" key={tweet.id}>
              {/* eslint-disable-next-line */}
              <Link href={`/${tweet.authorId}/${tweet.id}`}>
                <div className="flex gap-2 border-b border-border p-2 hover:bg-zinc-100">
                  <div>
                    <UserAvatar
                      user={{
                        name: tweet.author?.name,
                        image: tweet.author?.image,
                      }}
                    />
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between">
                      <div>
                        <span>{tweet.author?.name}</span>{" "}
                        <span className="font-thin">{` · ${dayjs(
                          tweet.created_at
                        ).fromNow()}`}</span>
                      </div>
                    </div>
                    <span className="max-w-full text-clip break-all">
                      {tweet.text}
                    </span>
                  </div>
                </div>
              </Link>
              <Button
                size={"icon"}
                variant={"ghost"}
                className="absolute right-0 top-0"
              >
                {/* TODO: weird bug with react server bundler */}
                {/* <TweetOperations tweetId={t.id} userId={user.id} /> */}
              </Button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Feed;
