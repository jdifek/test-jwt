"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/app/components/MainLayout";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      const session = await fetch("/api/auth/session").then((r) => r.json());
      setUser({ email, role: session.user.role, accessToken: session.accessToken });
      document.cookie = `refreshToken=${session.refreshToken}; HttpOnly; Secure`;
      router.push("/dashboard");
      toast.success("Вход успешен!");
    } else {
      console.error("Ошибка входа:", res?.error);
      toast.error(res?.error || "Ошибка при входе. Проверьте данные.");
    }
  };

  return (
    <MainLayout>
      <div className="max-w-md mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">Вход в систему</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
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
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Пароль
              </label>
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
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              Войти
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Забыли пароль?
            </Link>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Нет аккаунта?{" "}
              <Link
                href="/auth/register"
                className="text-blue-600 hover:text-blue-800"
              >
                Зарегистрироваться
              </Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </MainLayout>
  );
}