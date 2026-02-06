import Link from "next/link";
import Image from "next/image";
import { PremiumButton } from "./ui/PremiumButton";

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
            <div className="mx-auto max-w-7xl">
                <div className="glass flex items-center justify-between rounded-full px-6 py-3">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="relative w-12 h-12 md:w-16 md:h-16">
                            <Image
                                src="/logo_v10.png"
                                alt="Floxant Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <span className="text-xl md:text-3xl font-bold tracking-tight text-foreground">floxant.</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8">
                        {[
                            { label: "Leistungen", href: "#services" },
                            { label: "Extras", href: "#extras" },
                            { label: "Kontakt", href: "#contact" },
                            { label: "Über uns", href: "#about" }
                        ].map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <a href="#contact">
                            <PremiumButton size="icon" variant="ghost" className="md:hidden" aria-label="Menü öffnen">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg>
                            </PremiumButton>
                            <PremiumButton size="sm" className="hidden md:inline-flex">
                                Jetzt Buchen
                            </PremiumButton>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}
