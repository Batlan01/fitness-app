import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const [exercises, programs, days, items] = await Promise.all([
    prisma.exercise.count(),
    prisma.program.count(),
    prisma.programDay.count(),
    prisma.programDayItem.count(),
  ]);
  return NextResponse.json({ exercises, programs, days, items });
}
