import { Suspense } from "react";
import ResetPasswordClient from "./ResetPasswordClient";

// Тип PageProps из Next.js
interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ResetPasswordPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams; 
  const token = resolvedSearchParams.token; 

  return (
    <Suspense fallback={<div className="text-center p-6">Загрузка...</div>}>
      <ResetPasswordClient token={typeof token === "string" ? token : undefined} />
    </Suspense>
  );
}