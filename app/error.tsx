"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowLeft, Home, MessageCircle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App route error boundary", { message: error.message, digest: error.digest });
  }, [error]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center px-5 py-14 sm:px-8">
        <p className="text-sm font-bold uppercase tracking-normal text-primary">Fehler</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-normal sm:text-5xl">
          Die Seite konnte gerade nicht geladen werden.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
          Bitte versuchen Sie es erneut oder starten Sie die Anfrage ueber die Kontaktseite. Ihre
          Anfrage ist erst gesendet, wenn das Formular eine erfolgreiche Uebermittlung bestaetigt.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Erneut versuchen
          </button>
          <Link
            href="/kontakt"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-bold hover:border-primary/50 hover:text-primary"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Kontakt oeffnen
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-bold hover:border-primary/50 hover:text-primary"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Startseite
          </Link>
        </div>
        <Link href="/" className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-bold text-primary">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Zurueck zur Startseite
        </Link>
      </section>
    </main>
  );
}
