import Contact from "@/models/Contact";
import { NextRequest, NextResponse } from "next/server";
import { ContactSchema, ContactInput } from "@/lib/validations/contact";
import { ZodError } from "zod";
import dbConnect from "@/lib/mongodb";
import { getMailTransporter } from "@/lib/mailer";

const RECEIVER_EMAIL =
  process.env.CONTACT_RECEIVER_EMAIL || "solankimanish0045@gmail.com";
const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || "";

function buildWhatsAppUrl(data: ContactInput) {
  if (!WHATSAPP_NUMBER) return "";

  const text = [
    "Hi Manish, I just submitted the contact form on your portfolio.",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Subject: ${data.subject}`,
    `Message: ${data.message}`,
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    const validatedData: ContactInput = ContactSchema.parse(body);

    const result = await Contact.create(validatedData);

    const transporter = getMailTransporter();
    let notificationSent = false;
    let notificationError: string | null = null;

    if (transporter) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: RECEIVER_EMAIL,
          subject: `Portfolio contact: ${validatedData.subject}`,
          text: [
            "New contact form submission",
            `Name: ${validatedData.name}`,
            `Email: ${validatedData.email}`,
            `Subject: ${validatedData.subject}`,
            `Message: ${validatedData.message}`,
          ].join("\n"),
        });

        notificationSent = true;
      } catch (mailError) {
        console.error("Email notification failed:", mailError);
        notificationError = "Email notification failed";
      }
    } else {
      console.warn(
        "SMTP configuration is missing. Email notification skipped.",
      );
    }

    return NextResponse.json({
      success: true,
      message: "Contact saved",
      result,
      notificationSent,
      notificationError,
      whatsappUrl: buildWhatsAppUrl(validatedData),
    });
  } catch (error: unknown) {
    console.error("API error:", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          errors: error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
