import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { hashPassword, generateVerificationToken } from "@/lib/auth";
import { sendVerificationEmail } from "@/lib/mail";
import logger from "@/lib/logger";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // 100 запросов
});

export async function POST(req: NextRequest) {
  await limiter(req as any, null as any, () => {});
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email и пароль обязательны" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "Пользователь уже существует" }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    console.log('verificationToken before');

    const verificationToken = generateVerificationToken();
    console.log(verificationToken + 'verificationToken');
    

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        verificationToken,
      },
    });

    await sendVerificationEmail(email, verificationToken);
    logger.info(`Пользователь зарегистрирован: ${email}`);
    return NextResponse.json({ message: "Регистрация успешна, проверьте email для подтверждения" }, { status: 201 });
  } catch (error) {
    logger.error(`Ошибка при регистрации: ${error}`);
    return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
  }
}