"use client";
import Link from "next/link";
import { SessionProvider, useSession, signOut } from "next-auth/react";

function HomeContent() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-gray-100 flex flex-col items-center justify-center text-white">
      <header className="text-center py-10">
        <h1 className="text-5xl font-bold mb-4">
          Добро пожаловать в My Auth App
        </h1>
        <p className="text-xl">
          Простое и безопасное приложение для аутентификации
        </p>
      </header>

      <nav className="flex flex-col md:flex-row gap-4 mb-10">
        {!session ? (
          <div className="flex flex-row">
            <Link
              href="/auth/login"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg hover:bg-blue-100 transition"
            >
              Вход
            </Link>
            <Link
              href="/auth/register"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg hover:bg-blue-100 transition"
            >
              Регистрация
            </Link>
            <Link
              href="/auth/forgot-password"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg hover:bg-blue-100 transition"
            >
              Забыли пароль?
            </Link>
          </div>
        ) : (
          <>
            <Link
              href="/dashboard"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg hover:bg-blue-100 transition"
            >
              Главная
            </Link>
            {session.user.role === "admin" && (
              <Link
                href="/admin"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg hover:bg-blue-100 transition"
              >
                Админ-панель
              </Link>
            )}
            <button
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg hover:bg-blue-100 transition"
            >
              Выход
            </button>
          </>
        )}
      </nav>

      <footer className="absolute bottom-4 text-sm">
        <p>© 2025 My Auth App. Все права защищены.</p>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <SessionProvider>
      <HomeContent />
    </SessionProvider>
  );
}
