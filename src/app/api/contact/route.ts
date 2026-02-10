import Contact from "@/models/Contact";
import { NextRequest, NextResponse } from "next/server";
import { ContactSchema, ContactInput } from "@/lib/validations/contact";
import { ZodError } from "zod";
import dbConnect from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    const validatedData: ContactInput = ContactSchema.parse(body);

    const result = await Contact.create(validatedData);

    return NextResponse.json({
      success: true,
      message: "Contact saved",
      result,
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
