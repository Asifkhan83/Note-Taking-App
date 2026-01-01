import { NextRequest, NextResponse } from "next/server";
import { mockDb } from "@/lib/mock-db";

// GET /api/notes - Get all notes
export async function GET() {
  try {
    const notes = await mockDb.note.findMany();
    return NextResponse.json(notes);
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}

// POST /api/notes - Create a new note
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const note = await mockDb.note.create({
      data: {
        title: body.title || "",
        content: body.content || "",
        tags: body.tags || [],
        category: body.category || null,
      },
    });
    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error("Failed to create note:", error);
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 }
    );
  }
}
