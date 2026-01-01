# AI-Powered Note Taking App

A beautiful, modern note-taking application built with Next.js 15, featuring advanced AI capabilities powered by OpenAI. Create, organize, and enhance your notes with intelligent features like auto-completion, summarization, and AI-powered chat.

## Features

### Core Functionality
- **Rich Text Editor**: Powered by Tiptap with full formatting support
  - Headings, lists, quotes, code blocks
  - Task lists with checkboxes
  - Text formatting (bold, italic, strikethrough, code, highlight)
  - Links and typography enhancements

- **Note Management**
  - Create, read, update, and delete notes
  - Pin important notes
  - Real-time search across all notes
  - Auto-save functionality
  - Beautiful sidebar navigation

### AI-Powered Features
- **AI Summarization**: Generate concise summaries of your notes
- **Writing Enhancement**: Improve your writing with AI suggestions
- **AI Chat Assistant**: Ask questions about your notes using natural language
- **Smart Categorization**: Automatic categorization suggestions (coming soon)

### Design
- Beautiful, modern UI with Tailwind CSS
- Responsive design
- Clean, distraction-free writing environment
- Smooth animations and transitions
- Dark mode ready (theme system in place)

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Rich Text Editor**: Tiptap
- **AI**: OpenAI API (GPT-4o-mini)
- **Database**: SQLite with Prisma ORM (ready to use)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- OpenAI API key (for AI features)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Note-Taking-App
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy the `.env` file and add your OpenAI API key:
```bash
# .env
DATABASE_URL="file:./dev.db"
OPENAI_API_KEY="your-openai-api-key-here"
```

4. Generate Prisma client (if not already generated):
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Creating Notes
1. Click the "New" button in the sidebar
2. Start typing in the editor
3. Your note will auto-save as you type

### Using AI Features

#### Summarize Note
- Click the sparkles icon (✨) in the note header
- Get an instant AI-generated summary

#### Improve Writing
- Click the wand icon in the note header
- AI will enhance your writing while maintaining your voice

#### AI Chat Assistant
- Click the chat icon to open the AI assistant panel
- Ask questions about your notes
- Get intelligent answers based on your note content

### Organizing Notes
- **Pin Notes**: Click the pin icon to keep important notes at the top
- **Search**: Use the search bar to find notes quickly
- **Delete**: Click the trash icon to remove notes

## Project Structure

```
Note-Taking-App/
├── app/
│   ├── api/          # API routes
│   │   ├── notes/    # CRUD operations
│   │   └── ai/       # AI endpoints
│   ├── notes/        # Main notes page
│   ├── globals.css   # Global styles
│   └── layout.tsx    # Root layout
├── components/
│   ├── ui/           # shadcn/ui components
│   ├── editor/       # Tiptap editor
│   ├── note-list.tsx
│   └── ai-assistant-panel.tsx
├── lib/
│   ├── ai.ts         # AI utility functions
│   ├── mock-db.ts    # Development database
│   ├── prisma.ts     # Prisma client
│   └── utils.ts      # Utility functions
├── prisma/
│   └── schema.prisma # Database schema
└── types/
    └── index.ts      # TypeScript types
```

## Database Schema

The app uses a simple Note model:

```prisma
model Note {
  id        String   @id @default(cuid())
  title     String   @default("")
  content   String   @default("")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  tags      String[] @default([])
  category  String?
  isPinned  Boolean  @default(false)
}
```

## Development Notes

### Mock Database
During development, the app uses an in-memory mock database (`lib/mock-db.ts`) that can be easily replaced with the Prisma client once the database engines are available.

### AI Configuration
- All AI features use OpenAI's GPT-4o-mini model for cost-efficiency
- Temperature and token limits are optimized for each use case
- Error handling is in place for when API keys are not configured

## Building for Production

```bash
npm run build
npm start
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | SQLite database URL | Yes |
| `OPENAI_API_KEY` | OpenAI API key for AI features | Yes (for AI features) |

## Future Enhancements

- [ ] Dark mode toggle
- [ ] Note sharing and collaboration
- [ ] Export notes (PDF, Markdown)
- [ ] Image upload support
- [ ] Tags management UI
- [ ] Advanced search with filters
- [ ] Mobile app
- [ ] Voice notes with transcription
- [ ] Calendar integration
- [ ] Multiple notebooks/folders

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Rich text editing by [Tiptap](https://tiptap.dev/)
- AI powered by [OpenAI](https://openai.com/)