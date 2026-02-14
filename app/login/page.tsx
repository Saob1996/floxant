"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.ok) {
                router.push("/dashboard");
                router.refresh();
            } else {
                setError("Login fehlgeschlagen");
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            setError("Ein Fehler ist aufgetreten.");
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-background p-6">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-sm relative z-10"
            >
                <div className="glass p-8 rounded-2xl border border-white/10 shadow-2xl space-y-6">
                    <div className="text-center space-y-2">
                        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <Lock className="w-6 h-6 text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight">Admin Login</h1>
                        <p className="text-sm text-muted-foreground">Geschützter Bereich</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="admin@floxant.de"
                                className="w-full h-10 rounded-lg bg-background/50 border border-input px-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="password">Passwort</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="w-full h-10 rounded-lg bg-background/50 border border-input px-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                required
                            />
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm font-medium text-center">
                                {error}
                            </div>
                        )}

                        <button
                            disabled={loading}
                            type="submit"
                            className={cn(
                                "w-full rounded-lg bg-primary h-10 text-primary-foreground font-medium transition-all hover:opacity-90 disabled:opacity-50",
                                loading && "opacity-70 cursor-wait"
                            )}
                        >
                            {loading ? "Prüfe..." : "Anmelden"}
                        </button>
                    </form>
                </div>
            </motion.div>
        </main>
    );
}
