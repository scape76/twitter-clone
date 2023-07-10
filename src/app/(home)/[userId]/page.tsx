import Header from "@/components/layout/Header";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { getUserLiterals, updateImageUrl } from "@/lib/utils";

interface UserPageProps {
  params: {
    userId: string;
  };
}

const UserPage: React.FC<UserPageProps> = async ({ params }) => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, params.userId),
  });

  if (!user) notFound();

  console.log(user.image);

  return (
    <div>
      <Header title={user.name ?? ""} />
      <div className="relative h-36 bg-accent">
        <Avatar className="absolute bottom-0 left-0 -mb-[64px] ml-4 h-32 w-32 rounded-full border-4 border-background">
          <AvatarImage src={updateImageUrl(user.image ?? "", 216)} />
          <AvatarFallback>{getUserLiterals(user.name)}</AvatarFallback>
        </Avatar>
      </div>
      <div className="h-[64px]" />
      <hr className="w-full border-b border-border" />
      {user.email} page
    </div>
  );
};

export default UserPage;
