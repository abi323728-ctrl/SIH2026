import { NextRequest, NextResponse } from "next/server";
import { BIS_STANDARDS_DATABASE } from "@/lib/data/bisStandards";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.toLowerCase();

  if (!q) {
    return NextResponse.json({ standards: BIS_STANDARDS_DATABASE, total: BIS_STANDARDS_DATABASE.length });
  }

  const filtered = BIS_STANDARDS_DATABASE.filter(
    (std) =>
      std.isNumber.toLowerCase().includes(q) ||
      std.title.toLowerCase().includes(q) ||
      std.productCategory.toLowerCase().includes(q) ||
      std.scope.toLowerCase().includes(q)
  );

  return NextResponse.json({ standards: filtered, total: filtered.length });
}
