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

export async function sendAutoReply(to: string, name: string) {
  const transporter = getMailTransporter();
  if (!transporter) return;

  await transporter.sendMail({
    from: `"Manish Solanki" <${process.env.SMTP_FROM}>`,
    to,
    subject: "Thanks for reaching out!",
    html: `
      <h2>Hi ${name},</h2>
      <p>Thanks for contacting me! I've received your message and will get back to you shortly.</p>
      <br/>
      <p>Best regards,<br/>Manish Solanki</p>
    `,
  });
}

// Notify admin about new message
export async function sendAdminNotification(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const transporter = getMailTransporter();
  if (!transporter) return;

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_FROM}>`,
    to: process.env.CONTACT_RECEIVER_EMAIL,
    subject: `New Contact: ${data.subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong> ${data.message}</p>
    `,
  });
}
