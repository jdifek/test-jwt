"use client"; 

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <title>My Auth App</title>
        <meta
          name="description"
          content="Authentication app built with Next.js"
        />
      </head>
      <body className="bg-gray-100 min-h-screen">
        {" "}
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
