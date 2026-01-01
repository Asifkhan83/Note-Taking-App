import { NextRequest, NextResponse } from "next/server";
import { chatWithNotes } from "@/lib/ai";
import { mockDb } from "@/lib/mock-db";

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();

    if (!question) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    const notes = await mockDb.note.findMany();
    const answer = await chatWithNotes(question, notes);

    return NextResponse.json({ answer });
  } catch (error: any) {
    console.error("AI chat error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to answer question" },
      { status: 500 }
    );
  }
}
