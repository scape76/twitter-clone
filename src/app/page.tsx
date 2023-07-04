import { getServerSession } from "next-auth";
import Link from "next/link";
import * as React from "react";

interface pageProps {}

const page: React.FC<pageProps> = async ({}) => {
  const session = await getServerSession();

  return (
    <div>
      {!session?.user ? (
        <div>
          Welcome to twitter clone!
          <Link href="/login">Login</Link>{" "}
        </div>
      ) : (
        <div>Hello there, {session?.user.email}</div>
      )}
    </div>
  );
};

export default page;
