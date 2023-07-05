import LogoutButton from "@/components/LogoutButton";
import { getCurrentUser } from "@/lib/session";
import * as React from "react";

export default async function HomePage({}) {
  const user = await getCurrentUser();

  if (!user) return null;

  return (
    <div>
      You are home!! {user.email}
      <LogoutButton />
    </div>
  );
}
