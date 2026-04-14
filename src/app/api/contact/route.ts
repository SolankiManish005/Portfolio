import Contact from "@/models/Contact";
import { NextRequest, NextResponse } from "next/server";
import { ContactSchema, ContactInput } from "@/lib/validations/contact";
import { ZodError } from "zod";
import dbConnect from "@/lib/mongodb";
import { sendAdminNotification, sendAutoReply } from "@/lib/mailer";

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
    await Promise.allSettled([
      sendAutoReply(validatedData.email, validatedData.name),
      sendAdminNotification(validatedData),
    ]);

    const notificationSent = false;
    const notificationError: string | null = null;

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
