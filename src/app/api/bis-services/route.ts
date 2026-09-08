import { NextRequest, NextResponse } from "next/server";
import { BIS_SERVICES_DATABASE } from "@/lib/data/bisServices";

export async function GET() {
  return NextResponse.json({ services: BIS_SERVICES_DATABASE, total: BIS_SERVICES_DATABASE.length });
}
