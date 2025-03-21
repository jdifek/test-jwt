/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ResetPasswordClient({ token }: { token?: string }) {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/reset-password", { token, password });
      setMessage(res.data.message);
      setTimeout(() => router.push("/auth/login"), 2000); 
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Ошибка сервера");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl mb-4">Сброс пароля</h1>
      {message && (
        <p className={message.includes("Ошибка") ? "text-red-500" : "text-green-500"}>{message}</p>
      )}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Новый пароль"
        className="mb-4 p-2 border w-full"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white w-full">
        Сбросить
      </button>
    </form>
  );
}