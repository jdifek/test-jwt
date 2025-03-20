import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendVerificationEmail(email: string, token: string) {
  const verifyLink = `${process.env.APP_URL}/auth/verify?token=${token}`;
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Подтверждение email",
    html: `<p>Перейдите по ссылке для подтверждения email: <a href="${verifyLink}">${verifyLink}</a></p>`,
  });
}

export async function sendResetEmail(email: string, token: string) {
  const resetLink = `${process.env.APP_URL}/auth/reset-password?token=${token}`;
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Сброс пароля",
    html: `<p>Перейдите по ссылке для сброса пароля: <a href="${resetLink}">${resetLink}</a></p>`,
  });
}