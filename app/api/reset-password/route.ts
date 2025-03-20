import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import logger from "@/lib/logger";

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: { gte: new Date() },
      },
    });

    if (!user) {
      return NextResponse.json({ message: "Неверный или истекший токен" }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    logger.info(`Пароль сброшен для: ${user.email}`);
    return NextResponse.json({ message: "Пароль успешно сброшен" });
  } catch (error) {
    logger.error(`Ошибка при сбросе пароля: ${error}`);
    return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
  }
}