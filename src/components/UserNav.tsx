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

import { User } from "next-auth";
import { Icons } from "./Icons";
import { signOut } from "next-auth/react";
import UserAvatar from "./UserAvatar";

interface UserNavProps {
  user: User;
}

const UserNav: React.FC<UserNavProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-auto items-center justify-between gap-2"
        >
          <div className="flex items-center gap-2">
            <UserAvatar user={{ name: user.name, image: user.image }} />
            <div className="flex flex-col items-start gap-2 text-ellipsis text-xs">
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
            onClick={() => void signOut()}
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
