import * as React from "react";
import { siteConfig } from "@/config/site";
import { buttonVariants } from "./ui/Button";
import { Icons } from "@/components/Icons";
import { ScrollArea } from "@/components/ui/ScrollArea";
import SidebarNav from "@/components/layout/SidebarNav";
import UserNav from "@/components/UserNav";
import Link from "next/link";
import { getCurrentUser } from "@/lib/session";

interface MainNavProps {}

const MainNav: React.FC<MainNavProps> = async ({}) => {
  const user = await getCurrentUser();

  if (!user) return null;

  return (
    <ScrollArea className="w-full">
      <div className="sticky flex h-screen flex-col justify-between border-r border-border py-2 pr-4">
        <div className="flex flex-col gap-2">
          <Link
            href={"/home"}
            className={buttonVariants({
              variant: "ghost",
              className: "w-fit rounded-full",
            })}
          >
            <Icons.logo className="h-6 w-6" />
          </Link>
          <SidebarNav items={siteConfig.mainNav} />
          <Link
            href={"/tweet"}
            className={buttonVariants({ variant: "default" })}
          >
            <span>Tweet</span>
          </Link>
        </div>
        <UserNav user={user} />
      </div>
    </ScrollArea>
  );
};

export default MainNav;
