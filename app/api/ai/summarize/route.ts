import { NextRequest, NextResponse } from "next/server";
import { summarizeNote } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json();

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    const summary = await summarizeNote(content);
    return NextResponse.json({ summary });
  } catch (error: any) {
    console.error("AI summarization error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate summary" },
      { status: 500 }
    );
  }
}
