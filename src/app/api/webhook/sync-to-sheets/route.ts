import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ChatConversation from "@/models/ChatConversation";

/**
 * GET /api/webhook/sync-to-sheets
 *
 * This endpoint returns conversations that haven't been synced to Google Sheets yet.
 * It's meant to be called by a Google Apps Script running in your Sheet.
 *
 * Query params:
 * - webhookKey: Your secret webhook key (from env var SHEETS_WEBHOOK_SECRET)
 * - limit: Max conversations to return (default: 50)
 *
 * Response:
 * {
 *   "conversations": [
 *     {
 *       "visitorName": "John Doe",
 *       "visitorEmail": "john@example.com",
 *       "visitorIP": "192.168.1.1",
 *       "messageCount": 5,
 *       "createdAt": "2024-01-01",
 *       "updatedAt": "2024-01-02"
 *     }
 *   ]
 * }
 */
export async function GET(request: NextRequest) {
  try {
    const webhookKey = request.nextUrl.searchParams.get("webhookKey");
    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "50");

    // Validate webhook key
    const expectedKey = process.env.SHEETS_WEBHOOK_SECRET;
    if (!expectedKey || webhookKey !== expectedKey) {
      return NextResponse.json(
        { error: "Invalid webhook key" },
        { status: 401 },
      );
    }

    await dbConnect();

    // Fetch conversations that haven't been synced
    const conversations = await ChatConversation.find({
      syncedToSheet: { $ne: true },
    })
      .sort({ updatedAt: -1 })
      .limit(limit)
      .lean()
      .exec();

    const formattedData = conversations.map((conv) => ({
      visitorName: conv.visitorName || "Anonymous",
      visitorEmail: conv.visitorEmail || "—",
      visitorIP: conv.visitorIP || "unknown",
      messageCount: conv.messages?.length || 0,
      createdAt: new Date(conv.createdAt).toISOString().split("T")[0],
      updatedAt: new Date(conv.updatedAt).toISOString().split("T")[0],
    }));

    return NextResponse.json({
      success: true,
      conversations: formattedData,
      count: formattedData.length,
    });
  } catch (error) {
    console.error("Webhook sync error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch conversations",
      },
      { status: 500 },
    );
  }
}

/**
 * POST /api/webhook/sync-to-sheets
 *
 * Called by Google Apps Script after successfully syncing conversations to the Sheet.
 * This marks conversations as synced in MongoDB.
 *
 * Request body:
 * {
 *   "webhookKey": "your-secret-key",
 *   "count": 5
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      webhookKey: string;
      count: number;
    };

    // Validate webhook key
    const expectedKey = process.env.SHEETS_WEBHOOK_SECRET;
    if (!expectedKey || body.webhookKey !== expectedKey) {
      return NextResponse.json(
        { error: "Invalid webhook key" },
        { status: 401 },
      );
    }

    await dbConnect();

    // Mark the oldest `count` unsynced conversations as synced
    const unsynced = await ChatConversation.find({
      syncedToSheet: { $ne: true },
    })
      .sort({ createdAt: 1 })
      .limit(body.count)
      .exec();

    if (unsynced.length > 0) {
      await ChatConversation.updateMany(
        { _id: { $in: unsynced.map((c) => c._id) } },
        { syncedToSheet: true },
      );
    }

    return NextResponse.json({
      success: true,
      synced: unsynced.length,
    });
  } catch (error) {
    console.error("Webhook sync POST error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to mark conversations as synced",
      },
      { status: 500 },
    );
  }
}
