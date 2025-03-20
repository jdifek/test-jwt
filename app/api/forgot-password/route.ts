import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { generateResetToken } from "@/lib/auth";
import logger from "@/lib/logger";
import { sendResetEmail } from "@/lib/mail";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { message: "Пользователь не найден" },
        { status: 404 }
      );
    }

    const resetToken = generateResetToken();
    await prisma.user.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpiry: new Date(Date.now() + 3600000), // 1 час
      },
    });

    await sendResetEmail(email, resetToken);
    logger.info(`Отправлено письмо для сброса пароля: ${email}`);
    return NextResponse.json({ message: "Письмо отправлено" });
  } catch (error) {
    logger.error(`Ошибка при восстановлении пароля: ${error}`);
    return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
  }
}
