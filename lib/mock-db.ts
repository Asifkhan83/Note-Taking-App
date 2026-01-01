// Mock database for development when Prisma engines can't be downloaded
// This will be replaced with Prisma client in production

import { Note } from "@/types";

let notes: Note[] = [
  {
    id: "1",
    title: "Welcome to AI Notes!",
    content: "<h2>Getting Started</h2><p>This is your first note. Try editing it or create a new one!</p><ul><li>Use the rich text editor to format your notes</li><li>AI features will help you write faster</li><li>Search and organize your notes easily</li></ul>",
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: ["welcome"],
    category: "Tutorial",
    isPinned: true,
  },
];

export const mockDb = {
  note: {
    findMany: async () => {
      return notes.sort(
        (a, b) =>
          (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0) ||
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    },

    findUnique: async ({ where }: { where: { id: string } }) => {
      return notes.find((note) => note.id === where.id) || null;
    },

    create: async ({ data }: { data: Partial<Note> }) => {
      const newNote: Note = {
        id: Math.random().toString(36).substr(2, 9),
        title: data.title || "",
        content: data.content || "",
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: data.tags || [],
        category: data.category || null,
        isPinned: data.isPinned || false,
      };
      notes.unshift(newNote);
      return newNote;
    },

    update: async ({
      where,
      data,
    }: {
      where: { id: string };
      data: Partial<Note>;
    }) => {
      const index = notes.findIndex((note) => note.id === where.id);
      if (index === -1) return null;

      notes[index] = {
        ...notes[index],
        ...data,
        updatedAt: new Date(),
      };
      return notes[index];
    },

    delete: async ({ where }: { where: { id: string } }) => {
      const index = notes.findIndex((note) => note.id === where.id);
      if (index === -1) return null;

      const deleted = notes[index];
      notes.splice(index, 1);
      return deleted;
    },
  },
};
