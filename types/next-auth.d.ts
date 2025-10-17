import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    apiToken?: string;
    user: DefaultSession["user"] & {
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    apiToken?: string;
    picture?: string;
  }
}
