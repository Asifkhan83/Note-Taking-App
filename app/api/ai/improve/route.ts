import { NextRequest, NextResponse } from "next/server";
import { improveWriting } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json();

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    const improved = await improveWriting(content);
    return NextResponse.json({ improved });
  } catch (error: any) {
    console.error("AI improvement error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to improve text" },
      { status: 500 }
    );
  }
}
