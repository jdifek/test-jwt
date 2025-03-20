"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/register", { email, password });
      toast.success("Регистрация успешна!");
      router.push("/auth/login");
    } catch (error) {
      toast.error("Ошибка при регистрации. Пожалуйста, попробуйте снова.");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl mb-4">Регистрация</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mb-4 p-2 border w-full"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          className="mb-4 p-2 border w-full"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white w-full">
          Зарегистрироваться
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
