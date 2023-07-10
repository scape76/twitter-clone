import { type User } from "next-auth";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";

interface UserAvatarProps extends React.PropsWithoutRef<typeof AvatarImage> {
  user: {
    name: User["name"];
    image: User["image"];
  };
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, ...props }) => {
  const userLiterals = user.name
    ?.split(" ")
    .map((s) => s[0])
    .join("");

  return (
    <Avatar>
      <AvatarImage src={user.image ?? undefined} {...props} />
      <AvatarFallback>{userLiterals}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
