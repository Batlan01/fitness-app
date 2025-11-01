import { prisma } from "@/lib/prisma";

export default async function ProgramDetail({ params }:{ params: { slug: string }}){
  const prog = await prisma.program.findUnique({
    where: { slug: params.slug },
    include: {
      days: {
        include: {
          items: { include: { exercise: { include: { i18n: true } } } }
        },
        orderBy: [{ weekNo: "asc" }, { dayNo: "asc" }]
      }
    }
  });
  if(!prog) return <div className="card">Program nem található.</div>;

  return (
    <main className="grid">
      <div className="card">
        <h1 className="text-2xl font-semibold">{prog.slug.replace(/-/g," ")}</h1>
        <p className="text-sm text-[var(--muted)]">Szint: {prog.level} • Cél: {prog.goal} • {prog.durationWeeks} hét</p>
      </div>

      {prog.days.map(d => (
        <div key={d.id} className="card">
          <h3 className="font-semibold">Hét {d.weekNo}, nap {d.dayNo} — {d.title}</h3>
          <ul className="mt-2 list-disc ml-6">
            {d.items.sort((a,b)=>a.orderIdx-b.orderIdx).map(it => {
              const t = it.exercise.i18n[0];
              return <li key={it.id}>{t?.name ?? it.exercise.slug} — {it.schemeValue}</li>
            })}
          </ul>
        </div>
      ))}
    </main>
  );
}
