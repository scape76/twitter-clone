import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth/auth";

{/* eslint-disable-next-line */}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
