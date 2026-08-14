import { NextResponse } from "next/server";
import { getOpenAIConfig } from "./openaiConfig";

export async function GET() {
  const config = getOpenAIConfig();
  return NextResponse.json({
    configured: config.configured,
    model: config.model,
    secretExposed: false,
  });
}
