"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl mb-4">Вход</h1>
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
          Войти
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
