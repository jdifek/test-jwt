"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/reset-password", { token, password });
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl mb-4">Сброс пароля</h1>
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