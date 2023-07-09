import { type MainNavItem } from "@/types";

export const siteConfig = {
  name: "Twitter",
  logo: "twitter",
  description: "A twitter clone built using Next.js 13",
  url: "",
  ogImage: "",
  mainNav: [
    {
      title: "Home",
      href: "/home",
      icon: "home",
      items: [],
    },
  ] satisfies MainNavItem[],
};
