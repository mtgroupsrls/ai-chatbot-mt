import { NextResponse } from "next/server";
import { getChatModels } from "@/lib/ai/models";

export async function GET() {
  const models = getChatModels();
  return NextResponse.json(models);
}

