import { type User } from "next-auth";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";

interface UserAvatarProps {
  user: {
    name: User["name"];
    image: User["image"];
  };
}

const UserAvatar = ({ user }: UserAvatarProps) => {
  const userLiterals = user.name
    ?.split(" ")
    .map((s) => s[0])
    .join("");

  return (
    <Avatar>
      <AvatarImage src={user.image ?? ""} />
      <AvatarFallback>{userLiterals}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
