import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const isCron = req.headers.get("x-vercel-cron");

  if (!isCron) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  console.log("Vercel cron job running");

  return NextResponse.json({ success: true });
}