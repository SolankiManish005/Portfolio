import Contact from "@/models/Contact";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";

export async function DELETE(
  _: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    const { id } = await context.params;

    await Contact.findByIdAndUpdate(id, { deletedAt: new Date() });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { success: false, message: "Delete failed" },
      { status: 500 },
    );
  }
}
