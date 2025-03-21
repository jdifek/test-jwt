"use client";
import { SessionProvider } from "next-auth/react";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </div>
    </SessionProvider>
  );
}