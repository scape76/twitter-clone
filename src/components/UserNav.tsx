"use client";

import * as React from "react";

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { User } from "next-auth";
import { Icons } from "./Icons";
import { signOut } from "next-auth/react";

interface UserNavProps {
  user: User;
}

const UserNav: React.FC<UserNavProps> = ({ user }) => {
  console.log(user.name?.split(" "));
  const userLiterals = user.name
    ?.split(" ")
    .map((s) => s[0])
    .join("");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.pnsg" />
              <AvatarFallback>{userLiterals}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start gap-2 text-xs text-ellipsis">
              <span className="font-bold">{user.name}</span>
              <span className="text-muted-foreground">{user.email}</span>
            </div>
          </div>
          <Icons.horizontalDots className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <Button
            variant={"ghost"}
            onClick={() => signOut()}
            className="w-full text-ellipsis"
          >
            Sign out {user.email}
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
