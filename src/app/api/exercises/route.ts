import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const level = searchParams.get("level") ?? undefined;
  const tag = searchParams.get("tag") ?? undefined;

  const where: any = { isPublic: true };
  if (level) {
    // egyszerű példa: beginner ≤1, intermediate ≤2, advanced ≤3
    where.levelMin = {
      lte: level === "beginner" ? 1 : level === "intermediate" ? 2 : 3,
    };
  }

  const exercises = await prisma.exercise.findMany({
    where,
    include: { i18n: true, tags: { include: { tag: true } } },
  });

  const filtered = tag
    ? exercises.filter((e) => e.tags.some((t) => t.tag.slug === tag))
    : exercises;

  return NextResponse.json(filtered);
}
