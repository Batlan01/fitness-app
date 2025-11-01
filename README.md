# Fitness MVP Starter (Next.js 14 + Prisma + Postgres)

Gyakorlatok böngészése, programok (csomagok), alap részletek — Vercelre/Netlify-re kész.

## 1) Helyi futtatás
```bash
pnpm install # vagy npm i / yarn
cp .env.example .env
# Állítsd be a DATABASE_URL-t (Neon/Supabase Postgres)
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```
Nyisd meg: http://localhost:3000

## 2) Vercel beállítás (ajánlott)
1. Pushold GitHubra a repót.
2. Vercel → *New Project* → Import Repo.
3. **Environment Variables**: add `DATABASE_URL` (Neon/Supabase connection string).
4. **Build & Output**: Build Command: `prisma generate && next build`
5. Deploy. (Első deploy után fusson egy migráció lokálisan, vagy adj külön *post-deploy* parancsot a migrációra.)
   - Alternatíva: Vercel *Deploy Hooks* + GitHub Action a `prisma migrate deploy` futtatására.

## 3) Netlify (Next adapterrel)
- Használd a Netlify Next adaptert (`@netlify/plugin-nextjs`), és állítsd be az env-t (`DATABASE_URL`).
- Build command: `prisma generate && next build`

## 4) Adatmodell
- Prisma séma a `prisma/schema.prisma`-ban. Seed 3 gyakorlattal + 1 kezdő programmal.

## 5) Következő lépések
- Auth (NextAuth) hozzáadása
- Workout builder (drag&drop)
- Logs API + Progress oldal grafikonok
- Edzői/admin CRUD
