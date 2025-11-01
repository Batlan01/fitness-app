import { prisma } from "@/lib/prisma";

export default async function ExerciseDetail({ params, searchParams }:{ params: { slug: string }, searchParams: { lang?: string }}){
  const lang = searchParams.lang ?? "hu";
  const ex = await prisma.exercise.findUnique({
    where: { slug: params.slug },
    include: { i18n: true }
  });
  if(!ex) return <div className="card">Nincs ilyen gyakorlat.</div>;
  const t = ex.i18n.find(x => x.lang === lang) ?? ex.i18n[0];
  return (
    <main className="grid">
      <div className="card">
        <h1 className="text-2xl font-semibold">{t?.name ?? ex.slug}</h1>
        {t?.cue ? <p className="text-[var(--muted)] mt-1">{t.cue}</p> : null}
        {ex.videoUrl ? <p className="mt-3"><a className="btn" href={ex.videoUrl} target="_blank">Videó</a></p> : null}
      </div>
    </main>
  );
}
