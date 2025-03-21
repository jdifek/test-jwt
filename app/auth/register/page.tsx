"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/app/components/MainLayout";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/register", { email, password });

      toast.success(res.data?.message || "Регистрация успешна!");
      router.push("/auth/login");
    } catch (error) {
      console.error("Ошибка регистрации:", error);

      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data?.message || "Ошибка при регистрации.");
      } else {
        toast.error("Ошибка сети. Попробуйте позже.");
      }
    }
  };

  return (
    <MainLayout>
      <div className="max-w-md mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold mb-4">Регистрация</h1>
          <p className="text-gray-600 mb-6">
            Создайте аккаунт, чтобы получить доступ к системе.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              Зарегистрироваться
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Уже есть аккаунт?{" "}
              <Link
                href="/auth/login"
                className="text-blue-600 hover:text-blue-800"
              >
                Войти
              </Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </MainLayout>
  );
}
