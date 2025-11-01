import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Tags
  const tags = await prisma.tag.createMany({
    data: [
      { slug: "push", name: "Push" },
      { slug: "pull", name: "Pull" },
      { slug: "legs", name: "Legs" },
      { slug: "core", name: "Core" },
      { slug: "hiit", name: "HIIT" },
      { slug: "mobility", name: "Mobility" }
    ],
    skipDuplicates: true
  });

  // Exercises
  const pushup = await prisma.exercise.upsert({
    where: { slug: "push-up" },
    create: {
      slug: "push-up",
      levelMin: 1, levelMax: 3,
      equipment: "bodyweight",
      primaryMuscle: "chest",
      videoUrl: "https://www.youtube.com/watch?v=IODxDxX7oi4",
      i18n: {
        create: [
          { lang: "hu", name: "Fekvőtámasz", cue: "Feszes törzs, könyök 45°" },
          { lang: "sk", name: "Kliky", cue: "Pevné telo, lakte 45°" },
          { lang: "en", name: "Push-up", cue: "Tight core, elbows ~45°" }
        ]
      }
    },
    update: {}
  });

  const squat = await prisma.exercise.upsert({
    where: { slug: "air-squat" },
    create: {
      slug: "air-squat",
      levelMin: 1, levelMax: 3,
      equipment: "bodyweight",
      primaryMuscle: "legs",
      videoUrl: "https://www.youtube.com/watch?v=YaXPRqUwItQ",
      i18n: {
        create: [
          { lang: "hu", name: "Guggolás", cue: "Sarok a talajon, térd követi a lábujjat" },
          { lang: "sk", name: "Drep", cue: "Päta na zemi, koleno sleduje palec" },
          { lang: "en", name: "Air Squat", cue: "Heels down, knees track toes" }
        ]
      }
    },
    update: {}
  });

  const plank = await prisma.exercise.upsert({
    where: { slug: "plank" },
    create: {
      slug: "plank",
      levelMin: 1, levelMax: 3,
      equipment: "bodyweight",
      primaryMuscle: "core",
      videoUrl: "https://www.youtube.com/watch?v=pSHjTRCQxIw",
      i18n: {
        create: [
          { lang: "hu", name: "Plank", cue: "Semleges gerinc, farizom feszít" },
          { lang: "sk", name: "Plank", cue: "Neutrálna chrbtica, napnuté sedacie svaly" },
          { lang: "en", name: "Plank", cue: "Neutral spine, glutes engaged" }
        ]
      }
    },
    update: {}
  });

  // Example public beginner program (1 week, 3 days)
  const prog = await prisma.program.upsert({
    where: { slug: "beginner-foundation" },
    create: {
      slug: "beginner-foundation",
      level: "beginner",
      goal: "general",
      durationWeeks: 1,
      isPublic: true,
      days: {
        create: [
          {
            weekNo: 1, dayNo: 1, title: "Full Body A",
            items: {
              create: [
                { exercise: { connect: { slug: "push-up" } }, orderIdx: 1, schemeType: "reps", schemeValue: "3x10" },
                { exercise: { connect: { slug: "air-squat" } }, orderIdx: 2, schemeType: "reps", schemeValue: "3x15" },
                { exercise: { connect: { slug: "plank" } }, orderIdx: 3, schemeType: "time", schemeValue: "3x30s" }
              ]
            }
          },
          { weekNo: 1, dayNo: 3, title: "Full Body B",
            items: { create: [
              { exercise: { connect: { slug: "air-squat" } }, orderIdx: 1, schemeType: "reps", schemeValue: "4x12" },
              { exercise: { connect: { slug: "push-up" } }, orderIdx: 2, schemeType: "reps", schemeValue: "4x8" }
            ]} 
          },
          { weekNo: 1, dayNo: 5, title: "Core + Mobility",
            items: { create: [
              { exercise: { connect: { slug: "plank" } }, orderIdx: 1, schemeType: "time", schemeValue: "3x45s" }
            ]}
          }
        ]
      }
    },
    update: {}
  });

  console.log("Seed done.");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
