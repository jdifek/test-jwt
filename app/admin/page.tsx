"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import MainLayout from "@/app/components/MainLayout";
import { Shield, User } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<{ id: string; email: string; role: string }[]>([]);

  useEffect(() => {
    if (session?.user?.role === "admin") {
      axios
        .get("/api/users")
        .then((res) => setUsers(res.data))
        .catch(() => toast.error("Ошибка загрузки пользователей"));
    }
  }, [session]);

  if (!session) {
    return <div className="text-center mt-10">Загрузка...</div>;
  }

  if (session.user.role !== "admin") {
    return (
      <div className="flex justify-center items-center h-screen px-4">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md text-center max-w-sm w-full">
          <Shield className="w-10 h-10 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold">Доступ запрещен</h1>
          <p className="text-gray-600 mt-2">У вас нет прав для просмотра этой страницы.</p>
        </div>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">Админ-панель</h1>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[400px] border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-sm md:text-base">#</th>
                  <th className="border border-gray-300 p-2 text-sm md:text-base">Email</th>
                  <th className="border border-gray-300 p-2 text-sm md:text-base">Роль</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-2 text-sm md:text-base">{index + 1}</td>
                      <td className="border border-gray-300 p-2 text-sm md:text-base flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        {user.email}
                      </td>
                      <td className="border border-gray-300 p-2 text-sm md:text-base">{user.role}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center p-4 text-sm md:text-base">
                      Пользователей нет
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </MainLayout>
  );
}
