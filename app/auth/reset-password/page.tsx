import { Suspense } from "react";
import ResetPasswordClient from "./ResetPasswordClient";

interface PageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default function ResetPasswordPage({ searchParams }: PageProps) {
  const token = typeof searchParams.token === "string" ? searchParams.token : undefined;

  return (
    <Suspense fallback={<div className="text-center p-6">Загрузка...</div>}>
      <ResetPasswordClient token={token} />
    </Suspense>
  );
}
