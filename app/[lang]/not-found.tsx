"use client";

import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { motion } from "framer-motion";
import { MoveLeft, HelpCircle } from "lucide-react";
import de from "../../dictionaries/de.json";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Header lang="de" dic={de.nav} />
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 p-6 bg-white/5 rounded-full border border-white/10"
                >
                    <HelpCircle className="w-16 h-16 text-muted-foreground" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-6xl md:text-8xl font-bold mb-4 tracking-tighter"
                >
                    404
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl text-muted-foreground max-w-md mb-10"
                >
                    Ups! Diese Seite scheint umgezogen zu sein oder existiert nicht mehr.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all hover:gap-4"
                    >
                        <MoveLeft className="w-4 h-4" />
                        Zurück zur Startseite
                    </Link>
                </motion.div>
            </div>
            <Footer lang="de" dic={de} />
        </main>
    );
}
