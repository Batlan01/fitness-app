import { prisma } from "@/lib/prisma";
import ExerciseCard from "@/components/ExerciseCard";

export const revalidate = 60;

export default async function ExercisesPage({ searchParams }: { searchParams: { q?: string; lang?: string } }){
  const lang = searchParams.lang ?? "hu";
  const q = (searchParams.q ?? "").toLowerCase();

  const exercises = await prisma.exercise.findMany({
    where: { isPublic: true },
    include: { i18n: true }
  });

  const items = exercises.map(e => {
    const t = e.i18n.find(x => x.lang === lang) ?? e.i18n[0];
    return {
      id: e.id,
      slug: e.slug,
      name: t?.name ?? e.slug,
      cue: t?.cue ?? "",
      videoUrl: e.videoUrl
    };
  }).filter(x => (q ? x.name.toLowerCase().includes(q) : true));

  return (
    <main className="grid md:grid-cols-2 lg:grid-cols-3">
      {items.map(i => <ExerciseCard key={i.id} {...i} />)}
    </main>
  );
}
