"use client";

import * as React from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

interface TweetTimeProps {
  createdAt: Date;
  isPage?: boolean;
}

const TweetTime: React.FC<TweetTimeProps> = ({ createdAt, isPage }) => {
  
  if (!isPage) {
    return (
      <span className="font-thin">{` · ${dayjs(createdAt).fromNow()}`}</span>
    );
  }

  return (
    <span className="font-thin">{`${dayjs(createdAt).format("LT")}  · ${dayjs(
      createdAt
    ).format("ll")}`}</span>
  );
};

export default TweetTime;
