"use client";
import Link from "next/link";
import { SessionProvider, useSession, signOut } from "next-auth/react";

function HomeContent() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-gray-100 flex flex-col items-center justify-center text-white px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="text-center py-6 sm:py-8 md:py-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 md:mb-4">
          Добро пожаловать в My Auth App
        </h1>
        <p className="text-base sm:text-lg md:text-xl">
          Простое и безопасное приложение для аутентификации
        </p>
      </header>

      {/* Navigation */}
      <nav className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10 w-full max-w-xs sm:max-w-sm md:max-w-md">
        {!session ? (
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
            <Link
              href="/auth/login"
              className="bg-white text-blue-600 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg shadow-lg hover:bg-blue-100 transition text-center text-sm sm:text-base"
            >
              Вход
            </Link>
            <Link
              href="/auth/register"
              className="bg-white text-blue-600 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg shadow-lg hover:bg-blue-100 transition text-center text-sm sm:text-base"
            >
              Регистрация
            </Link>
            <Link
              href="/auth/forgot-password"
              className="bg-white text-blue-600 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg shadow-lg hover:bg-blue-100 transition text-center text-sm sm:text-base"
            >
              Забыли пароль?
            </Link>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
            <Link
              href="/dashboard"
              className="bg-white text-blue-600 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg shadow-lg hover:bg-blue-100 transition text-center text-sm sm:text-base"
            >
              Главная
            </Link>
            {session.user.role === "admin" && (
              <Link
                href="/admin"
                className="bg-white text-blue-600 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg shadow-lg hover:bg-blue-100 transition text-center text-sm sm:text-base"
              >
                Админ-панель
              </Link>
            )}
            <button
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
              className="bg-white text-blue-600 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg shadow-lg hover:bg-blue-100 transition text-center text-sm sm:text-base"
            >
              Выход
            </button>
          </div>
        )}
      </nav>

      {/* Footer */}
      <footer className="mt-auto py-4 text-center text-xs sm:text-sm">
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