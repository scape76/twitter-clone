import { type MainNavItem } from "@/types";
import Link from "next/link";
import * as React from "react";
import { buttonVariants } from "../ui/Button";
import { Icons } from "@/components/Icons";

interface SidebarNavProps {
  items: MainNavItem[];
}

const SidebarNav: React.FC<SidebarNavProps> = ({ items }) => {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, _) => {
        const Icon = Icons[item.icon ?? "logo"];

        return item.href ? (
          <Link
            href={item.href}
            className={buttonVariants({
              variant: "ghost",
              className: "rounded-full w-fit",
            })}
            key={_}
          >
            <Icon className="mr-2 h-6 w-6" aria-hidden="true" />
            <span className="text-lg">{item.title}</span>
          </Link>
        ) : (
          <span key={_}>{item.title}</span>
        );
      })}
    </div>
  );
};

export default SidebarNav;
