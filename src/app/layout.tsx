import * as React from "react";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

interface LayoutProps {
  children: React.ReactNode;
  tweetModal: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, tweetModal }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          {tweetModal}
        </Providers>
      </body>
    </html>
  );
};

export default Layout;
