'use client'

import * as React from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
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

export default Login;
