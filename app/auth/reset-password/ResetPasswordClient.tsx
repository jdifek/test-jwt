/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Lock } from "lucide-react";
import MainLayout from "@/app/components/MainLayout";

export default function ResetPasswordClient() {
  const [password, setPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams(); 
  const token = searchParams.get("token") || undefined; 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/reset-password", { token, password });
      toast.success(res.data.message || "Пароль успешно сброшен!");
      setTimeout(() => router.push("/auth/login"), 2000);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Ошибка сервера");
    }
  };

  return (
    <MainLayout>
      <div className="max-w-md mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold mb-4">Сброс пароля</h1>
          <p className="text-gray-600 mb-6">
            Введите новый пароль для вашего аккаунта.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Новый пароль"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              Сбросить пароль
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </MainLayout>
  );
}