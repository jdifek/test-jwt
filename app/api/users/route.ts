import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (token?.role !== "admin") {
    return NextResponse.json({ message: "Доступ запрещен" }, { status: 403 });
  }

  const users = await prisma.user.findMany({
    select: { id: true, email: true, role: true },
  });

  return NextResponse.json(users);
}