import { Suspense } from "react";
import VerifyClient from "./VerifyClient";

interface PageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default function VerifyPage({ searchParams }: PageProps) {
  const token = typeof searchParams.token === "string" ? searchParams.token : undefined;

  return (
    <Suspense fallback={<div className="text-center p-6">Загрузка...</div>}>
      <VerifyClient token={token} />
    </Suspense>
  );
}
