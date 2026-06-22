import Link from "next/link";
import { Header } from "@/components/Header";
import { MoveLeft, HelpCircle } from "lucide-react";
import de from "@/dictionaries/de.json";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header dic={de as any} />
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-1/2 start-/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="mb-8 rounded-full border border-white/10 bg-white/5 p-6">
          <HelpCircle className="w-16 h-16 text-muted-foreground" />
        </div>
        <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tighter">
          404
        </h1>
        <p className="text-xl text-muted-foreground max-w-md mb-10">
          Ups! Diese Seite scheint umgezogen zu sein oder existiert nicht mehr.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all hover:gap-4"
        >
          <MoveLeft className="w-4 h-4" aria-hidden="true" />
          Zurück zur Startseite
        </Link>
      </div>
    </main>
  );
}
