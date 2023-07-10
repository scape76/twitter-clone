import * as React from "react";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-border bg-background/90 p-2 text-xl font-bold">
      {title}
    </div>
  );
};

export default Header;
