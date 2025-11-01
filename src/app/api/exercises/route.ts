import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const key = new URL(req.url).searchParams.get("key");
  if (!process.env.SEED_KEY || key !== process.env.SEED_KEY) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const count = await prisma.exercise.count();
  if (count > 0) return NextResponse.json({ ok: true, note: "Already seeded" });

  await prisma.tag.createMany({
    data: [
      { slug: "push", name: "Push" },
      { slug: "pull", name: "Pull" },
      { slug: "legs", name: "Legs" },
      { slug: "core", name: "Core" },
      { slug: "hiit", name: "HIIT" },
      { slug: "mobility", name: "Mobility" },
    ],
    skipDuplicates: true,
  });

  const mk = (slug:string, videoUrl?:string, i18n?: any[]) =>
    prisma.exercise.create({
      data: {
        slug, levelMin:1, levelMax:3, equipment:"bodyweight",
        primaryMuscle: slug==="air-squat"?"legs":slug==="push-up"?"chest":"core",
        videoUrl, i18n: { create: i18n ?? [] }
      }
    });

  const pushup = await mk("push-up","https://www.youtube.com/watch?v=IODxDxX7oi4",[
    { lang:"hu", name:"Fekvőtámasz", cue:"Feszes törzs, könyök 45°" },
    { lang:"sk", name:"Kliky", cue:"Pevné telo, lakte 45°" },
    { lang:"en", name:"Push-up", cue:"Tight core, elbows ~45°" },
  ]);
  const squat = await mk("air-squat","https://www.youtube.com/watch?v=YaXPRqUwItQ",[
    { lang:"hu", name:"Guggolás", cue:"Sarok a talajon, térd követi a lábujjat" },
    { lang:"sk", name:"Drep", cue:"Päta na zemi, koleno sleduje palec" },
    { lang:"en", name:"Air Squat", cue:"Heels down, knees track toes" },
  ]);
  const plank = await mk("plank","https://www.youtube.com/watch?v=pSHjTRCQxIw",[
    { lang:"hu", name:"Plank", cue:"Semleges gerinc, farizom feszít" },
    { lang:"sk", name:"Plank", cue:"Neutrálna chrbtica, napnuté sedacie svaly" },
    { lang:"en", name:"Plank", cue:"Neutral spine, glutes engaged" },
  ]);

  await prisma.program.create({
    data: {
      slug: "beginner-foundation",
      level: "beginner",
      goal: "general",
      durationWeeks: 1,
      isPublic: true,
      days: {
        create: [
          { weekNo:1, dayNo:1, title:"Full Body A",
            items:{ create:[
              { exerciseId: pushup.id, orderIdx:1, schemeType:"reps", schemeValue:"3x10" },
              { exerciseId: squat.id,  orderIdx:2, schemeType:"reps", schemeValue:"3x15" },
              { exerciseId: plank.id,  orderIdx:3, schemeType:"time", schemeValue:"3x30s" },
            ]}},
          { weekNo:1, dayNo:3, title:"Full Body B",
            items:{ create:[
              { exerciseId: squat.id,  orderIdx:1, schemeType:"reps", schemeValue:"4x12" },
              { exerciseId: pushup.id, orderIdx:2, schemeType:"reps", schemeValue:"4x8" },
            ]}},
          { weekNo:1, dayNo:5, title:"Core + Mobility",
            items:{ create:[
              { exerciseId: plank.id, orderIdx:1, schemeType:"time", schemeValue:"3x45s" },
            ]}},
        ]
      }
    }
  });

  return NextResponse.json({ ok: true });
}
