import { NextRequest, NextResponse } from "next/server";
import { processBISQuery } from "@/lib/services/bisEngine";

export async function POST(req: NextRequest) {
  try {
    let query = "";
    try {
      const body = await req.json();
      query = body?.query || "";
    } catch {
      const text = await req.text();
      try {
        const parsed = JSON.parse(text);
        query = parsed?.query || "";
      } catch {
        query = text;
      }
    }

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Query is required." }, { status: 400 });
    }

    const result = processBISQuery(query);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("API Chat Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error while processing BIS query." },
      { status: 500 }
    );
  }
}
