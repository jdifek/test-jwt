"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import MainLayout from "@/app/components/MainLayout";
import { User, ShieldCheck, LogOut } from "lucide-react";
import { SessionProvider } from "next-auth/react"; // Импортируем SessionProvider

export default function DashboardPage() {
  return (
    <SessionProvider>
      <DashboardContent />
    </SessionProvider>
  );
}

function DashboardContent() {
  const { data: session, status } = useSession();

  // Показываем загрузку, пока статус сессии не определен
  if (status === "loading") {
    return (
      <div className="text-center mt-10 text-sm md:text-base">Загрузка...</div>
    );
  }

  // Если пользователь не авторизован, перенаправляем на страницу логина
  if (status === "unauthenticated") {
    return (
      <div className="text-center mt-10 text-sm md:text-base">
        Пожалуйста, войдите в систему.{" "}
        <Link href="/auth/login" className="text-blue-500 hover:underline">
          Войти
        </Link>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-sm md:max-w-lg mx-auto px-4">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md text-center">
          <User className="w-10 h-10 md:w-12 md:h-12 text-blue-500 mx-auto mb-4" />
          <h1 className="text-xl md:text-3xl font-bold mb-2">
            Добро пожаловать, {session?.user?.email}!
          </h1>
          <p className="text-gray-600 mb-6 text-sm md:text-base">
            Вы успешно вошли в систему.
          </p>

          {/* Навигация */}
          <div className="flex flex-col gap-4">
            {session?.user?.role === "admin" && (
              <Link
                href="/admin"
                className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 md:px-6 md:py-2.5 rounded-lg hover:bg-blue-600 transition w-full"
              >
                <ShieldCheck className="w-5 h-5 mr-2" />
                Перейти в админ-панель
              </Link>
            )}
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center justify-center bg-red-500 text-white px-4 py-2 md:px-6 md:py-2.5 rounded-lg hover:bg-red-600 transition w-full"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Выйти
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}