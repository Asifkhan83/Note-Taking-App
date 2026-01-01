import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Google Gemini AI client
// Users will need to add their API key to .env file
const genAI = process.env.GOOGLE_API_KEY
  ? new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)
  : null;

// Use Gemini 1.5 Flash for fast, cost-effective responses
const MODEL_NAME = "gemini-1.5-flash";

export async function generateCompletion(prompt: string): Promise<string> {
  if (!genAI) {
    throw new Error("Google API key not configured. Please add GOOGLE_API_KEY to your .env file.");
  }

  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `You are a helpful writing assistant. Continue the user's text naturally and concisely.\n\n${prompt}`,
          },
        ],
      },
    ],
    generationConfig: {
      maxOutputTokens: 150,
      temperature: 0.7,
    },
  });

  const response = await result.response;
  return response.text() || "";
}

export async function summarizeNote(content: string): Promise<string> {
  if (!genAI) {
    throw new Error("Google API key not configured. Please add GOOGLE_API_KEY to your .env file.");
  }

  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `You are a helpful assistant that creates concise summaries of notes. Provide a brief, clear summary highlighting the key points.\n\nSummarize this note:\n\n${content}`,
          },
        ],
      },
    ],
    generationConfig: {
      maxOutputTokens: 200,
      temperature: 0.5,
    },
  });

  const response = await result.response;
  return response.text() || "";
}

export async function improveWriting(content: string): Promise<string> {
  if (!genAI) {
    throw new Error("Google API key not configured. Please add GOOGLE_API_KEY to your .env file.");
  }

  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `You are a helpful writing assistant. Improve the user's writing by making it clearer, more concise, and better structured while maintaining their original meaning and tone.\n\nImprove this text:\n\n${content}`,
          },
        ],
      },
    ],
    generationConfig: {
      maxOutputTokens: 500,
      temperature: 0.7,
    },
  });

  const response = await result.response;
  return response.text() || "";
}

export async function categorizeNote(content: string): Promise<string> {
  if (!genAI) {
    throw new Error("Google API key not configured. Please add GOOGLE_API_KEY to your .env file.");
  }

  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `You are a helpful assistant that categorizes notes. Based on the content, suggest ONE appropriate category (like Work, Personal, Ideas, Research, etc.). Return only the category name, nothing else.\n\nCategorize this note:\n\n${content}`,
          },
        ],
      },
    ],
    generationConfig: {
      maxOutputTokens: 10,
      temperature: 0.3,
    },
  });

  const response = await result.response;
  return response.text()?.trim() || "General";
}

export async function chatWithNotes(
  question: string,
  notes: Array<{ title: string; content: string }>
): Promise<string> {
  if (!genAI) {
    throw new Error("Google API key not configured. Please add GOOGLE_API_KEY to your .env file.");
  }

  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const notesContext = notes
    .map((note) => `Title: ${note.title}\nContent: ${note.content}`)
    .join("\n\n---\n\n");

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `You are a helpful assistant that answers questions about the user's notes. Use the provided notes context to answer questions accurately and helpfully.\n\nHere are my notes:\n\n${notesContext}\n\nQuestion: ${question}`,
          },
        ],
      },
    ],
    generationConfig: {
      maxOutputTokens: 500,
      temperature: 0.7,
    },
  });

  const response = await result.response;
  return response.text() || "";
}
