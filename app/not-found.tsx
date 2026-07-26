import Link from "next/link";
import { Header } from "@/components/Header";
import { ArrowLeft, ClipboardCheck, Home, MapPin, MessageCircle } from "lucide-react";
import de from "@/dictionaries/de.json";

const helpfulLinks = [
  { href: "/", label: "Startseite", Icon: Home },
  { href: "/kontakt", label: "Kontakt", Icon: MessageCircle },
  { href: "/leistungen", label: "Leistungen", Icon: ClipboardCheck },
  { href: "/angebot-guenstiger-pruefen", label: "Angebot prüfen", Icon: ClipboardCheck },
  { href: "/duesseldorf", label: "Düsseldorf", Icon: MapPin },
  { href: "/regensburg", label: "Regensburg", Icon: MapPin },
];

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header dic={de as any} />
      <section className="mx-auto flex min-h-[72vh] w-full max-w-5xl flex-col justify-center px-5 py-14 sm:px-8">
        <p className="text-sm font-bold uppercase tracking-normal text-primary">404</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-normal text-foreground sm:text-5xl">
          Diese Seite ist nicht mehr an der erwarteten Stelle.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
          Der Link kann veraltet sein oder die Leistung wurde neu eingeordnet. Sie können direkt
          zur passenden Anfrage, zum Standort oder zur Leistungsübersicht wechseln.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {helpfulLinks.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className="inline-flex min-h-14 items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-sm font-bold text-card-foreground transition hover:border-primary/50 hover:text-primary"
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              {label}
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-bold text-primary hover:text-primary/80"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Zur Startseite
        </Link>
      </section>
    </main>
  );
}
