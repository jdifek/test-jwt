import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashed: string) {
  return bcrypt.compare(password, hashed);
}

export function generateVerificationToken() {
  return uuidv4(); 
}

export function generateResetToken() {
  return uuidv4();
}

export function generateTokens(user: { id: string; email: string; role: string }) {
  const accessToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ id: user.id }, SECRET, { expiresIn: "7d" });
  return { accessToken, refreshToken };
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET) as { id: string; email?: string; role?: string };
}
