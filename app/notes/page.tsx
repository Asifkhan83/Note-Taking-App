"use client";

import { useState, useEffect } from "react";
import { Note } from "@/types";
import { NoteList } from "@/components/note-list";
import { TiptapEditor } from "@/components/editor/tiptap-editor";
import { AIAssistantPanel } from "@/components/ai-assistant-panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Search,
  Sparkles,
  Trash2,
  Pin,
  Tag,
  MessageSquare,
  FileText,
  Wand2,
  Loader2,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [isAIProcessing, setIsAIProcessing] = useState(false);

  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  // Load notes on mount
  useEffect(() => {
    loadNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadNotes = async () => {
    try {
      const response = await fetch("/api/notes");
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
        if (data.length > 0 && !selectedNoteId) {
          setSelectedNoteId(data[0].id);
        }
      }
    } catch (error) {
      console.error("Failed to load notes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createNote = async () => {
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Untitled Note",
          content: "",
        }),
      });

      if (response.ok) {
        const newNote = await response.json();
        setNotes([newNote, ...notes]);
        setSelectedNoteId(newNote.id);
      }
    } catch (error) {
      console.error("Failed to create note:", error);
    }
  };

  const updateNote = async (updates: Partial<Note>) => {
    if (!selectedNoteId) return;

    try {
      const response = await fetch(`/api/notes/${selectedNoteId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        const updatedNote = await response.json();
        setNotes(
          notes.map((note) =>
            note.id === selectedNoteId ? updatedNote : note
          )
        );
      }
    } catch (error) {
      console.error("Failed to update note:", error);
    }
  };

  const deleteNote = async () => {
    if (!selectedNoteId) return;

    try {
      const response = await fetch(`/api/notes/${selectedNoteId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const remainingNotes = notes.filter(
          (note) => note.id !== selectedNoteId
        );
        setNotes(remainingNotes);
        setSelectedNoteId(remainingNotes[0]?.id || null);
      }
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  const togglePin = async () => {
    if (!selectedNote) return;
    updateNote({ isPinned: !selectedNote.isPinned });
  };

  const summarizeNote = async () => {
    if (!selectedNote || !selectedNote.content) return;

    setIsAIProcessing(true);
    try {
      const response = await fetch("/api/ai/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: selectedNote.content }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Summary:\n\n${data.summary}`);
      } else {
        const error = await response.json();
        alert(error.error || "Failed to summarize note");
      }
    } catch (error) {
      alert("Failed to connect to AI service");
    } finally {
      setIsAIProcessing(false);
    }
  };

  const improveNote = async () => {
    if (!selectedNote || !selectedNote.content) return;

    setIsAIProcessing(true);
    try {
      const response = await fetch("/api/ai/improve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: selectedNote.content }),
      });

      if (response.ok) {
        const data = await response.json();
        updateNote({ content: data.improved });
      } else {
        const error = await response.json();
        alert(error.error || "Failed to improve note");
      }
    } catch (error) {
      alert("Failed to connect to AI service");
    } finally {
      setIsAIProcessing(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-80 border-r flex flex-col bg-muted/30">
        {/* Sidebar Header */}
        <div className="p-4 border-b bg-background/50 backdrop-blur">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Notes
            </h1>
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={createNote}>
                <Plus className="h-4 w-4 mr-1" />
                New
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleLogout}
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Notes List */}
        <NoteList
          notes={filteredNotes}
          selectedNoteId={selectedNoteId}
          onSelectNote={setSelectedNoteId}
        />
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col">
        {selectedNote ? (
          <>
            {/* Editor Header */}
            <div className="border-b p-4 bg-background/50 backdrop-blur">
              <div className="flex items-center justify-between mb-2">
                <Input
                  value={selectedNote.title}
                  onChange={(e) => updateNote({ title: e.target.value })}
                  className="text-2xl font-bold border-none shadow-none px-0 focus-visible:ring-0"
                  placeholder="Untitled"
                />
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={summarizeNote}
                    disabled={isAIProcessing}
                    title="Summarize note with AI"
                  >
                    {isAIProcessing ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={improveNote}
                    disabled={isAIProcessing}
                    title="Improve writing with AI"
                  >
                    <Wand2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowAIPanel(!showAIPanel)}
                    className={cn(showAIPanel && "text-primary")}
                    title="AI Assistant"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Separator orientation="vertical" className="h-6" />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={togglePin}
                    className={cn(
                      selectedNote.isPinned && "text-primary"
                    )}
                    title="Pin note"
                  >
                    <Pin className="h-4 w-4" />
                  </Button>
                  <Separator orientation="vertical" className="h-6" />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={deleteNote}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Last edited{" "}
                {new Date(selectedNote.updatedAt).toLocaleString()}
              </div>
            </div>

            {/* Editor */}
            <ScrollArea className="flex-1">
              <TiptapEditor
                content={selectedNote.content}
                onChange={(content) => updateNote({ content })}
                placeholder="Start writing your note..."
              />
            </ScrollArea>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No note selected</p>
              <p className="text-sm">
                Select a note or create a new one to get started
              </p>
            </div>
          </div>
        )}
      </div>

      {/* AI Assistant Panel */}
      {showAIPanel && <AIAssistantPanel />}
    </div>
  );
}
