import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyToken, generateTokens } from "@/lib/auth";
import logger from "@/lib/logger";

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get("refreshToken")?.value;
    if (!refreshToken) {
      return NextResponse.json({ message: "Токен отсутствует" }, { status: 401 });
    }

    const decoded = verifyToken(refreshToken);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id, refreshToken },
    });

    if (!user) {
      return NextResponse.json({ message: "Неверный refresh-токен" }, { status: 401 });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken },
    });

    logger.info(`Токен обновлен для: ${user.email}`);
    const response = NextResponse.json({ accessToken });
    response.cookies.set("refreshToken", newRefreshToken, { httpOnly: true, secure: true });
    return response;
  } catch (error) {
    logger.error(`Ошибка при обновлении токена: ${error}`);
    return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
  }
}