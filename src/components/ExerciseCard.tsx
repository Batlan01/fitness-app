import Link from "next/link";

type Props = {
  id: string;
  name: string;
  cue?: string | null;
  videoUrl?: string | null;
  slug: string;
}
export default function ExerciseCard({ id, name, cue, videoUrl, slug }: Props){
  return (
    <div className="card">
      <h3 className="text-lg font-semibold">{name}</h3>
      {cue ? <p className="text-sm text-[var(--muted)]">{cue}</p> : null}
      <div className="mt-2 flex gap-2">
        {videoUrl ? <a className="btn" href={videoUrl} target="_blank">Videó</a> : null}
        <Link className="btn" href={`/exercises/${slug}`}>Részletek</Link>
      </div>
    </div>
  );
}
