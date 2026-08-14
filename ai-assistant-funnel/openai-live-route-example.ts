import { NextResponse } from "next/server";
import { getOpenAIConfig } from "./openaiConfig";

function extractResponseText(payload: unknown): string {
  if (!payload || typeof payload !== "object") return "";
  const data = payload as { output?: Array<{ content?: Array<{ type?: string; text?: string; refusal?: string }> }> };
  return (data.output ?? [])
    .flatMap((item) => item.content ?? [])
    .filter((item) => item.type === "output_text" && typeof item.text === "string")
    .map((item) => item.text!.trim())
    .filter(Boolean)
    .join("\n")
    .trim();
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 1200) : "";
  if (!message) return NextResponse.json({ error: "A message is required." }, { status: 400 });

  const config = getOpenAIConfig();
  if (!config.configured || !config.apiKey) {
    return NextResponse.json({ error: "AI is not configured." }, { status: 503 });
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: config.model,
      instructions: "You are a concise website representative. Stay grounded in supplied business context and do not invent facts.",
      input: message,
      reasoning: { effort: "minimal" },
      max_output_tokens: 800,
      store: false,
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    console.error("OpenAI Responses API error", response.status, data);
    return NextResponse.json({ error: "The representative could not respond right now." }, { status: 502 });
  }

  const text = extractResponseText(data);
  if (!text) {
    console.error("OpenAI response contained no visible text", data);
    return NextResponse.json({ error: "The representative returned no visible response." }, { status: 502 });
  }

  return NextResponse.json({ text, mode: "live-openai" });
}
