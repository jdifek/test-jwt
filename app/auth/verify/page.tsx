"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      axios
        .post("/api/verify", { token })
        .then(() => router.push("/auth/login"))
        .catch((error) => console.error(error));
    }
  }, [token, router]);

  return <div className="text-center">Подтверждение email...</div>;
}