import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const programs = await prisma.program.findMany({
    where: { isPublic: true },
    orderBy: [{ level: "asc" }, { slug: "asc" }],
    include: {
      days: {
        orderBy: [{ weekNo: "asc" }, { dayNo: "asc" }],
        include: {
          items: {
            orderBy: { orderIdx: "asc" },
            include: { exercise: { include: { i18n: true } } },
          },
        },
      },
    },
  });
  return NextResponse.json(programs);
}
