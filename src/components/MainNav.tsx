import * as React from "react";
import { siteConfig } from "@/config/site";
import { buttonVariants } from "./ui/Button";
import { Icons } from "@/components/Icons";
import { ScrollArea } from "@/components/ui/ScrollArea";
import SidebarNav from "@/components/layout/SidebarNav";
import UserNav from "@/components/UserNav";
import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import TweetButton from "@/components/TweetButton";

interface MainNavProps {}

const MainNav: React.FC<MainNavProps> = async ({}) => {
  const user = await getCurrentUser();

  if (!user) return null;

  return (
    <aside className="fixed top-0 z-30 hidden h-screen w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
      {/* <ScrollArea className="w-full"> */}
        <div className="flex h-full flex-col justify-between border-r border-border py-2 pr-4">
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
            <TweetButton user={user} />
          </div>
          <UserNav user={user} />
        </div>
      {/* </ScrollArea> */}
    </aside>
  );
};

export default MainNav;
