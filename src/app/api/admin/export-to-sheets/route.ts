import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type Conversation = {
  visitorName?: string;
  visitorEmail?: string;
  visitorIP?: string;
  messages: Array<{ role: string; content: string }>;
  createdAt: string;
  updatedAt: string;
};

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as { conversations: Conversation[] };
    const conversations = body.conversations || [];

    // Format data for Google Sheets
    const sheetData = conversations.map((conv) => ({
      "Visitor Name": conv.visitorName || "Anonymous",
      "Email": conv.visitorEmail || "—",
      "IP Address": conv.visitorIP || "unknown",
      "Message Count": conv.messages.length,
      "Last Updated": new Date(conv.updatedAt).toISOString().split("T")[0],
      "Date & Time": new Date(conv.updatedAt).toLocaleString(),
    }));

    // Convert to CSV
    const headers = Object.keys(sheetData[0] || {});
    const csv = [
      headers.join(","),
      ...sheetData.map((row) =>
        headers.map((header) => {
          const value = (row as Record<string, string | number>)[header];
          const stringValue = String(value);
          // Escape quotes and wrap in quotes if contains comma
          return stringValue.includes(",")
            ? `"${stringValue.replace(/"/g, '""')}"`
            : stringValue;
        }).join(","),
      ),
    ].join("\n");

    // Return as downloadable CSV
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="conversations-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to export",
      },
      { status: 500 },
    );
  }
}
