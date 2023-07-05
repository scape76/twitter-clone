"use client";

import * as React from "react";
import { Button } from "./ui/Button";
import { signOut } from "next-auth/react";

interface LogoutButtonProps {}

const LogoutButton: React.FC<LogoutButtonProps> = ({}) => {
  return <Button onClick={() => signOut()}>Logout</Button>;
};

export default LogoutButton;
