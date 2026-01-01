"use client";

import { Note } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { FileText, Pin } from "lucide-react";

interface NoteListProps {
  notes: Note[];
  selectedNoteId: string | null;
  onSelectNote: (noteId: string) => void;
}

export function NoteList({ notes, selectedNoteId, onSelectNote }: NoteListProps) {
  const getPreviewText = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    return text.slice(0, 100) + (text.length > 100 ? "..." : "");
  };

  return (
    <ScrollArea className="h-[calc(100vh-120px)]">
      <div className="space-y-2 p-4">
        {notes.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No notes yet</p>
            <p className="text-sm">Create your first note to get started</p>
          </div>
        ) : (
          notes.map((note) => (
            <Card
              key={note.id}
              className={cn(
                "p-4 cursor-pointer transition-all hover:shadow-md",
                selectedNoteId === note.id && "border-primary shadow-md"
              )}
              onClick={() => onSelectNote(note.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-sm line-clamp-1">
                  {note.title || "Untitled"}
                </h3>
                {note.isPinned && (
                  <Pin className="h-4 w-4 text-primary flex-shrink-0" />
                )}
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                {getPreviewText(note.content)}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(note.updatedAt), {
                    addSuffix: true,
                  })}
                </span>
                {note.category && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                    {note.category}
                  </span>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </ScrollArea>
  );
}
