/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    role: string;
    accessToken: string;
    refreshToken: string;
  }

  interface Session {
    user: User;
    accessToken: string;
    refreshToken: string;
  }

  interface JWT {
    id: string;
    email: string;
    role: string;
    accessToken: string;
    refreshToken: string;
  }
}
