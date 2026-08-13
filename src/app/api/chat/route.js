import { NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/chatContext";

// Very basic in-memory rate limiting (per server instance).
// Note: on serverless platforms (Vercel), instances can spin up/down, so this
// isn't a hard guarantee — but it stops casual abuse/runaway costs day-to-day.
// For a hard guarantee, use a persistent store (Upstash Redis, etc).
const requestLog = new Map();
const RATE_LIMIT = 15; // max messages
const WINDOW_MS = 10 * 60 * 1000; // per 10 minutes, per IP

function isRateLimited(ip) {
  const now = Date.now();
  const entry = requestLog.get(ip) || { count: 0, start: now };

  if (now - entry.start > WINDOW_MS) {
    requestLog.set(ip, { count: 1, start: now });
    return false;
  }

  entry.count += 1;
  requestLog.set(ip, entry);
  return entry.count > RATE_LIMIT;
}

export async function POST(request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many messages. Please try again in a bit." },
        { status: 429 }
      );
    }

    const { messages } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { success: false, error: "No message provided" },
        { status: 400 }
      );
    }

    // Cap message length so someone can't paste in a huge blob and burn tokens.
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.content?.length > 800) {
      return NextResponse.json(
        { success: false, error: "Message too long — please keep it under 800 characters." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error("Missing OPENROUTER_API_KEY env var");
      return NextResponse.json(
        { success: false, error: "Chatbot is not configured yet." },
        { status: 500 }
      );
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        // OpenRouter asks for these two headers for attribution — update to your real site.
        "HTTP-Referer": "https://www.irfanstack.site",
        "X-Title": "Irfan Portfolio Chatbot",
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || "openrouter/free",
        max_tokens: 400,
        messages: [
          { role: "system", content: buildSystemPrompt() },
          // Only forward the last few turns to keep token usage predictable.
          ...messages.slice(-8),
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenRouter API error:", response.status, errText);
      return NextResponse.json(
        { success: false, error: "Chatbot failed to respond. Please try again." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json(
        { success: false, error: "Chatbot returned an empty response." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, reply });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong." },
      { status: 500 }
    );
  }
}
