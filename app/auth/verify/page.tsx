import { Suspense } from "react";
import VerifyClient from "./VerifyClient";

// Убираем PageProps, так как searchParams больше не нужен
export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="text-center p-6">Загрузка...</div>}>
      <VerifyClient />
    </Suspense>
  );
}