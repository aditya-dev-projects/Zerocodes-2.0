
import { GoogleGenAI, Chat } from "@google/genai";
import { Language, ToolMode } from "../types";

const apiKey = process.env.API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey || '' });
const MODEL_NAME = 'gemini-2.5-flash';

interface StreamCallbacks {
  onChunk: (text: string) => void;
}

export class CodeExecutor {
  private chat: Chat | null = null;
  private language: Language;

  constructor(language: Language) {
    this.language = language;
  }

  async start(code: string, onChunk: (text: string) => void): Promise<void> {
    if (!apiKey) {
      onChunk("Error: API Key is missing. Please check your environment configuration.\n");
      return;
    }

    const systemInstruction = getSystemInstruction(ToolMode.EXECUTE, this.language);
    
    this.chat = ai.chats.create({
      model: MODEL_NAME,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.0, // Deterministic for execution
      }
    });

    const prompt = `Execute the following code:\n\`\`\`${this.language}\n${code}\n\`\`\``;

    try {
      const resultStream = await this.chat.sendMessageStream({ message: prompt });
      for await (const chunk of resultStream) {
        if (chunk.text) {
          onChunk(chunk.text);
        }
      }
    } catch (error: any) {
      onChunk(`\n[System Error]: ${error.message || 'Unknown execution error'}`);
      throw error;
    }
  }

  async sendInput(input: string, onChunk: (text: string) => void): Promise<void> {
    if (!this.chat) return;

    try {
      const resultStream = await this.chat.sendMessageStream({ message: input });
      for await (const chunk of resultStream) {
        if (chunk.text) {
          onChunk(chunk.text);
        }
      }
    } catch (error: any) {
      onChunk(`\n[System Error]: ${error.message || 'Input processing error'}`);
    }
  }
}

const getSystemInstruction = (mode: ToolMode, language: Language): string => {
  let langName = "Unknown";
  if (language === Language.C) langName = "C (GCC)";
  else if (language === Language.PYTHON) langName = "Python 3";
  else if (language === Language.JAVA) langName = "Java (OpenJDK)";
  
  switch (mode) {
    case ToolMode.EXECUTE:
      return `You are a highly accurate ${langName} execution engine. 
      Your task is to simulate the execution of the provided code.
      
      STRICT RULES:
      1. Output ONLY the standard output (stdout) and standard error (stderr).
      2. If the code expects user input (e.g., scanf, input(), Scanner):
         - Output the token "__REQ_IN__" immediately after printing the prompt (if any).
         - STOP generating output and wait for the next user message which will contain the input.
      3. Do NOT provide explanations, markdown formatting, or conversational filler.
      4. Be strictly deterministic.`;
      
    case ToolMode.EXPLAIN:
      return `You are a helpful coding tutor. Explain the provided ${langName} code line-by-line.

      STRICT RULES:
      1. Go through each significant line or block of code.
      2. Provide exactly ONE simple sentence explaining that specific line.
      3. Do NOT write a summary paragraph at the start or end.
      4. Format as a clean list.
      
      Example Output Format:
      • #include <stdio.h>: Imports the standard library needed for printing text.
      • int main(): This is the main function where the program execution begins.`;
      
    case ToolMode.DEBUG:
      return `You are a static analysis tool for ${langName}. 
      Analyze the code for bugs, logical errors, or syntax issues.
      Provide a list of issues found and the corrected code block.`;
      
    case ToolMode.OPTIMIZE:
      return `Rewrite the ${langName} code to be more efficient and cleaner. 
      Explain briefly what was improved.`;
      
    default:
      return "You are a coding assistant.";
  }
};

export const streamGeminiResponse = async (
  code: string,
  language: Language,
  mode: ToolMode,
  callbacks: StreamCallbacks
): Promise<string> => {
  if (!apiKey) {
    const errorMsg = "Error: API Key is missing. Please check your environment configuration.";
    callbacks.onChunk(errorMsg);
    return errorMsg;
  }

  try {
    const systemInstruction = getSystemInstruction(mode, language);
    
    const responseStream = await ai.models.generateContentStream({
      model: MODEL_NAME,
      contents: code,
      config: {
        systemInstruction: systemInstruction,
        temperature: mode === ToolMode.EXECUTE ? 0.0 : 0.5,
      }
    });

    let fullText = "";
    for await (const chunk of responseStream) {
      const text = chunk.text;
      if (text) {
        fullText += text;
        callbacks.onChunk(text);
      }
    }
    return fullText;

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    const errorMessage = `\n[System Error]: ${error.message || 'Unknown error'}`;
    callbacks.onChunk(errorMessage);
    throw error;
  }
};
