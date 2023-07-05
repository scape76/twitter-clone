import * as React from "react";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = async ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children} 
      </body>
    </html>
  );
};

export default Layout;
