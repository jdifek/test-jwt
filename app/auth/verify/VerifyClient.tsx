"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function VerifyClient({ token }: { token?: string }) {
  const [message, setMessage] = useState("Подтверждение email...");
  const router = useRouter();

  useEffect(() => {
    if (token) {
      axios
        .post("/api/verify", { token })
        .then((res) => {
          setMessage(res.data.message || "Email успешно подтвержден");
          setTimeout(() => router.push("/auth/login"), 2000); 
        })
        .catch((error) => {
          setMessage(error.response?.data?.message || "Ошибка подтверждения");
        });
    } else {
      setMessage("Токен отсутствует");
    }
  }, [token, router]);

  return (
    <div className="text-center p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl mb-4">Подтверждение email</h1>
      <p className={message.includes("Ошибка") ? "text-red-500" : "text-green-500"}>{message}</p>
    </div>
  );
}