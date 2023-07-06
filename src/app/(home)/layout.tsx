import MainNav from "@/components/MainNav";
import * as React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Laoyut({ children }: LayoutProps) {
  return (
    <div className="container max-w-[1200px]">
      <div className="grid grid-cols-[280px_1fr]">
        <MainNav />
        <div className="w-full max-w-2xl border-r border-border">
          {children}
        </div>
      </div>
    </div>
  );
}
