export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  category: string | null;
  isPinned: boolean;
}

export interface CreateNoteInput {
  title?: string;
  content?: string;
  tags?: string[];
  category?: string;
}

export interface UpdateNoteInput {
  title?: string;
  content?: string;
  tags?: string[];
  category?: string;
  isPinned?: boolean;
}
