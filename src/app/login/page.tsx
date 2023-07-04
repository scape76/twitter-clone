"use client";

import { Button } from "@/components/ui/Button";
import * as React from "react";
import { signIn } from "next-auth/react";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
  async function signInWithGoogle() {
    console.log("here");
    try {
      await signIn("google", {
        callbackUrl: "/",
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Button onClick={() => signInWithGoogle()}>Sign in with Google</Button>
  );
};

export default page;
