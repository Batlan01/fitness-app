import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Fitness MVP",
  description: "Gyakorlatok, csomagok, edzéstervek",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu">
      <body>
        <div className="container">
          <header className="mb-6 flex items-center justify-between">
            <Link href="/" className="text-xl font-semibold">Fitness MVP</Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/exercises">Gyakorlatok</Link>
              <Link href="/programs">Programok</Link>
              <Link href="/today">Mai nap</Link>
              <Link href="/progress">Haladás</Link>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
