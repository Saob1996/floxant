import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full border-t border-white/10 bg-black/5 py-12 backdrop-blur-3xl">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
                <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-muted-foreground">
                    <p>&copy; 2026 FLOXANT.</p>
                    <a href="tel:015771105087" className="hover:text-foreground transition-colors">01577 110 50 87</a>
                    <a href="mailto:salehobidvc@gmail.com" className="hover:text-foreground transition-colors">salehobidvc@gmail.com</a>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6">
                    <Link href="/impressum" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                        Impressum
                    </Link>
                    <Link href="/datenschutz" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                        Datenschutz
                    </Link>
                    <Link href="/agb" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                        AGB
                    </Link>
                    <Link href="/widerruf" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                        Widerruf
                    </Link>
                    <Link href="/buchungsbedingungen" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                        Buchungsbedingungen
                    </Link>
                    <Link href="/dashboard" className="text-xs font-medium text-slate-500 hover:text-primary transition-colors">
                        Intern
                    </Link>
                </div>
            </div>
        </footer>
    );
}
