import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ProgramsPage(){
  const programs = await prisma.program.findMany({
    where: { isPublic: true },
    orderBy: { slug: "asc" }
  });
  return (
    <main className="grid md:grid-cols-2">
      {programs.map(p => (
        <div key={p.id} className="card">
          <h3 className="text-lg font-semibold">{p.slug.replace(/-/g," ")}</h3>
          <p className="text-sm text-[var(--muted)]">Szint: {p.level} • Cél: {p.goal} • {p.durationWeeks} hét</p>
          <Link className="btn mt-3 inline-block" href={`/programs/${p.slug}`}>Megnyitás</Link>
        </div>
      ))}
    </main>
  );
}
