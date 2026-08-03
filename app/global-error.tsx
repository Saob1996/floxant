"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global app error boundary", { message: error.message, digest: error.digest });
  }, [error]);

  return (
    <html lang="de">
      <body>
        <main className="min-h-screen bg-white px-5 py-16 text-slate-950">
          <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center">
            <p className="text-sm font-bold uppercase tracking-normal text-cyan-700">Fehler</p>
            <h1 className="mt-3 text-4xl font-black tracking-normal sm:text-5xl">
              FLOXANT konnte gerade nicht vollstaendig geladen werden.
            </h1>
            <p className="mt-5 text-base leading-7 text-slate-700">
              Bitte laden Sie die Seite neu oder wechseln Sie zur Startseite. Es werden keine
              technischen Details angezeigt und keine Anfrage als erfolgreich markiert.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={reset}
                className="min-h-11 rounded-lg bg-slate-950 px-4 py-2 text-sm font-bold text-white"
              >
                Erneut versuchen
              </button>
              <a
                href="/kontakt?mode=neutral&source=direct"
                className="inline-flex min-h-11 items-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-950"
              >
                Kontakt oeffnen
              </a>
              <a
                href="/"
                className="inline-flex min-h-11 items-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-950"
              >
                Startseite
              </a>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
