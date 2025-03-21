"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Импортируем useSearchParams
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "@/app/components/MainLayout";

export default function VerifyClient() {
  const [message, setMessage] = useState("Подтверждение email...");
  const router = useRouter();
  const searchParams = useSearchParams(); // Получаем searchParams на клиентской стороне
  const token = searchParams.get("token") || undefined; // Извлекаем token из URL

  useEffect(() => {
    if (token) {
      axios
        .post("/api/verify", { token })
        .then((res) => {
          setMessage(res.data.message || "Email успешно подтвержден");
          toast.success(res.data.message || "Email успешно подтвержден!");
          setTimeout(() => router.push("/auth/login"), 2000);
        })
        .catch((error) => {
          setMessage(error.response?.data?.message || "Ошибка подтверждения");
          toast.error(error.response?.data?.message || "Ошибка подтверждения");
        });
    } else {
      setMessage("Токен отсутствует");
      toast.error("Токен отсутствует");
    }
  }, [token, router]);

  return (
    <MainLayout>
      <div className="max-w-md mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold mb-4">Подтверждение email</h1>
          <p
            className={
              message.includes("Ошибка") ? "text-red-500" : "text-green-500"
            }
          >
            {message}
          </p>
        </div>
      </div>
      <ToastContainer />
    </MainLayout>
  );
}