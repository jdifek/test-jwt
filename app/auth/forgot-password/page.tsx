"use client";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mail } from "lucide-react";
import MainLayout from "@/app/components/MainLayout";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/forgot-password", { email });
      toast.success("Письмо для восстановления отправлено!");
    } catch (error) {
      toast.error("Ошибка при отправке письма. Попробуйте снова.");
      console.error(error);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-md mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold mb-4">Восстановление пароля</h1>
          <p className="text-gray-600 mb-6">
            Введите ваш email, и мы отправим вам инструкцию по восстановлению пароля.
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
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              Отправить письмо
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </MainLayout>
  );
}
