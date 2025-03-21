import { Suspense } from "react";
import VerifyClient from "./VerifyClient";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function VerifyPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams; 
  const token = resolvedSearchParams.token; 

  return (
    <Suspense fallback={<div className="text-center p-6">Загрузка...</div>}>
      <VerifyClient token={typeof token === "string" ? token : undefined} />
    </Suspense>
  );
}