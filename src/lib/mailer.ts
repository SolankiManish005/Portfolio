import nodemailer from "nodemailer";

export function getMailTransporter() {
  const host = process.env.SMTP_HOST?.trim();
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, "").trim();

  if (!host || !port || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465,
    auth: {
      user,
      pass,
    },
  });
}
