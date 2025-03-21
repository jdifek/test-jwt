"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-yellow-400">
            MyAuthApp
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {!session ? (
              <>
                <Link
                  href="/auth/login"
                  className="text-gray-300 hover:text-yellow-400 transition"
                >
                  Вход
                </Link>
                <Link
                  href="/auth/register"
                  className="text-gray-300 hover:text-yellow-400 transition"
                >
                  Регистрация
                </Link>
                <Link
                  href="/auth/forgot-password"
                  className="text-gray-300 hover:text-yellow-400 transition"
                >
                  Забыли пароль?
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-300 hover:text-yellow-400 transition"
                >
                  Главная
                </Link>
                {session.user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="text-gray-300 hover:text-yellow-400 transition"
                  >
                    Админ-панель
                  </Link>
                )}
                <button
                  onClick={() => signOut({ callbackUrl: "/auth/login" })}
                  className="text-gray-300 hover:text-yellow-400 transition"
                >
                  Выход
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2 bg-gray-700 p-4 rounded">
            {!session ? (
              <>
                <Link
                  href="/auth/login"
                  className="block py-2 text-gray-300 hover:text-yellow-400 transition"
                >
                  Вход
                </Link>
                <Link
                  href="/auth/register"
                  className="block py-2 text-gray-300 hover:text-yellow-400 transition"
                >
                  Регистрация
                </Link>
                <Link
                  href="/auth/forgot-password"
                  className="block py-2 text-gray-300 hover:text-yellow-400 transition"
                >
                  Забыли пароль?
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="block py-2 text-gray-300 hover:text-yellow-400 transition"
                >
                  Главная
                </Link>
                {session.user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="block py-2 text-gray-300 hover:text-yellow-400 transition"
                  >
                    Админ-панель
                  </Link>
                )}
                <button
                  onClick={() => signOut({ callbackUrl: "/auth/login" })}
                  className="block w-full text-left py-2 text-gray-300 hover:text-yellow-400 transition"
                >
                  Выход
                </button>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}