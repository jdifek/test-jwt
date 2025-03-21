import { Suspense } from "react";
import ResetPasswordClient from "./ResetPasswordClient";

// Убираем PageProps, так как searchParams больше не нужен
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-center p-6">Загрузка...</div>}>
      <ResetPasswordClient />
    </Suspense>
  );
}