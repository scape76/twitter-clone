import { redirect } from "next/navigation";
import * as React from "react";

export default async function IndexPage() {
  redirect("/home");
}
