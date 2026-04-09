import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ChatConversation from "@/models/ChatConversation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const conversations = await ChatConversation.find()
      .sort({ updatedAt: -1 })
      .lean()
      .exec();

    return NextResponse.json({
      success: true,
      conversations: conversations || [],
    });
  } catch (error) {
    console.error("Conversations API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch conversations",
      },
      { status: 500 },
    );
  }
}
