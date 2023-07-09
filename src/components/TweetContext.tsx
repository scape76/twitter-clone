'use client'

import * as React from "react";

interface TweetContextProps {
  children: React.ReactNode;
}

export const TweetContext = React.createContext<{
  refetch: boolean;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

const TweetContextProvider: React.FC<TweetContextProps> = ({ children }) => {
  const [refetch, setRefetch] = React.useState(false);

  return (
    <TweetContext.Provider value={{ refetch, setRefetch }}>
      {children}
    </TweetContext.Provider>
  );
};

export default TweetContextProvider;
