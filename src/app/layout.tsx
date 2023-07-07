import * as React from "react";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

interface LayoutProps {
  children: React.ReactNode;
  tweetModal: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = async ({ children, tweetModal }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {tweetModal}
        <Toaster />
      </body>
    </html>
  );
};

export default Layout;
