"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session } = useSession();

  if (!session) {
    return <div className="text-center mt-10">Загрузка...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">
          Добро пожаловать, {session?.user?.email}!
        </h1>
        <p className="text-lg mb-6">Вы успешно вошли в систему.</p>

        {/* Навигация */}
        <div className="flex flex-col gap-4">
          {session?.user?.role === "admin" && (
            <Link
              href="/admin"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Перейти в админ-панель
            </Link>
          )}
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
}
