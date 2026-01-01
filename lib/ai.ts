import OpenAI from "openai";

// Initialize OpenAI client
// Users will need to add their API key to .env file
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function generateCompletion(prompt: string): Promise<string> {
  if (!openai) {
    throw new Error("OpenAI API key not configured. Please add OPENAI_API_KEY to your .env file.");
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful writing assistant. Continue the user's text naturally and concisely.",
      },
      { role: "user", content: prompt },
    ],
    max_tokens: 150,
    temperature: 0.7,
  });

  return response.choices[0]?.message?.content || "";
}

export async function summarizeNote(content: string): Promise<string> {
  if (!openai) {
    throw new Error("OpenAI API key not configured. Please add OPENAI_API_KEY to your .env file.");
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that creates concise summaries of notes. Provide a brief, clear summary highlighting the key points.",
      },
      { role: "user", content: `Summarize this note:\n\n${content}` },
    ],
    max_tokens: 200,
    temperature: 0.5,
  });

  return response.choices[0]?.message?.content || "";
}

export async function improveWriting(content: string): Promise<string> {
  if (!openai) {
    throw new Error("OpenAI API key not configured. Please add OPENAI_API_KEY to your .env file.");
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful writing assistant. Improve the user's writing by making it clearer, more concise, and better structured while maintaining their original meaning and tone.",
      },
      { role: "user", content: `Improve this text:\n\n${content}` },
    ],
    max_tokens: 500,
    temperature: 0.7,
  });

  return response.choices[0]?.message?.content || "";
}

export async function categorizeNote(content: string): Promise<string> {
  if (!openai) {
    throw new Error("OpenAI API key not configured. Please add OPENAI_API_KEY to your .env file.");
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that categorizes notes. Based on the content, suggest ONE appropriate category (like Work, Personal, Ideas, Research, etc.). Return only the category name, nothing else.",
      },
      { role: "user", content: `Categorize this note:\n\n${content}` },
    ],
    max_tokens: 10,
    temperature: 0.3,
  });

  return response.choices[0]?.message?.content?.trim() || "General";
}

export async function chatWithNotes(
  question: string,
  notes: Array<{ title: string; content: string }>
): Promise<string> {
  if (!openai) {
    throw new Error("OpenAI API key not configured. Please add OPENAI_API_KEY to your .env file.");
  }

  const notesContext = notes
    .map((note) => `Title: ${note.title}\nContent: ${note.content}`)
    .join("\n\n---\n\n");

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that answers questions about the user's notes. Use the provided notes context to answer questions accurately and helpfully.",
      },
      {
        role: "user",
        content: `Here are my notes:\n\n${notesContext}\n\nQuestion: ${question}`,
      },
    ],
    max_tokens: 500,
    temperature: 0.7,
  });

  return response.choices[0]?.message?.content || "";
}
