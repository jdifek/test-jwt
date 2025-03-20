"use client";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/forgot-password", { email });
      toast.success("Письмо отправлено");
    } catch (error) {
      toast.error("Ошибка при отправке письма. Попробуйте снова.");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl mb-4">Восстановление пароля</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mb-4 p-2 border w-full"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white w-full">
          Отправить
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
