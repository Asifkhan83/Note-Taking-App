import { NextRequest, NextResponse } from "next/server";
import { generateCompletion } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const completion = await generateCompletion(prompt);
    return NextResponse.json({ completion });
  } catch (error: any) {
    console.error("AI completion error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate completion" },
      { status: 500 }
    );
  }
}
