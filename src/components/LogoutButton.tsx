"use client";

import * as React from "react";
import { Button } from "./ui/Button";
import { signOut } from "next-auth/react";


const LogoutButton: React.FC = ({}) => {
  return <Button onClick={() => void signOut()}>Logout</Button>;
};

export default LogoutButton;
