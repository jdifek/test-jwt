import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/db";
import { generateTokens, verifyPassword } from "@/lib/auth";
import logger from "@/lib/logger";
import { NextAuthOptions } from "next-auth";

// Определяем authOptions внутри файла
const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email и пароль обязательны");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !(await verifyPassword(credentials.password, user.password))) {
          throw new Error("Неверные данные");
        }

        if (!user.emailVerified) {
          throw new Error("Подтвердите email перед входом");
        }

        const { accessToken, refreshToken } = generateTokens({
          id: user.id,
          email: user.email,
          role: user.role,
        });

        await prisma.user.update({
          where: { id: user.id },
          data: { refreshToken },
        });

        logger.info(`Пользователь вошел: ${user.email}`);
        return {
          id: user.id,
          email: user.email,
          role: user.role,
          accessToken,
          refreshToken,
        };
      },
    }),
  ],
  jwt: {
    maxAge: 15 * 60, // 15 минут
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email as string,
        role: token.role as string,
        accessToken: token.accessToken as string,
        refreshToken: token.refreshToken as string,
      };
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

// Создаем обработчик NextAuth
const handler = NextAuth(authOptions);

// Экспортируем только функции HTTP-методов
export { handler as GET, handler as POST };