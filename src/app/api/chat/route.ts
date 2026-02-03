import { NextResponse } from "next/server";

const baseUrl = process.env.OPENAI_BASE_URL ?? "http://localhost:11434/v1";
const apiKey = process.env.OPENAI_API_KEY ?? "";
const model = process.env.OPENAI_MODEL ?? "gpt-3.5-turbo";

export async function POST(request: Request) {
  try {
    const { messages, model: requestModel } = (await request.json()) as {
      messages: Array<{ role: string; content: string }>;
      model?: string;
    };

    if (!messages?.length) {
      return NextResponse.json(
        { error: "No messages provided." },
        { status: 400 }
      );
    }

    const selectedModel = requestModel || model;

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {})
      },
      body: JSON.stringify({
        model: selectedModel,
        messages,
        temperature: 0.6
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Upstream error: ${errorText}` },
        { status: 500 }
      );
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const message =
      data.choices?.[0]?.message?.content?.trim() ||
      "I couldn't generate a response.";

    return NextResponse.json({ message });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unexpected server error."
      },
      { status: 500 }
    );
  }
}
