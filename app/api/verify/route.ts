import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import logger from "@/lib/logger";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    const user = await prisma.user.findFirst({
      where: { verificationToken: token },
    });

    if (!user) {
      return NextResponse.json({ message: "Неверный токен" }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: true, verificationToken: null },
    });

    logger.info(`Email подтвержден для: ${user.email}`);
    return NextResponse.json({ message: "Email успешно подтвержден" });
  } catch (error) {
    logger.error(`Ошибка при подтверждении email: ${error}`);
    return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
  }
}