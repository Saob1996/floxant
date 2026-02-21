"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";

interface LoginFormProps {
    dict: any;
}

export default function LoginForm({ dict }: LoginFormProps) {
    const t = dict.auth;
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
            console.log("Attempting sign in...");
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });
            console.log("Sign in result:", res);

            if (res?.ok) {
                console.log("Redirecting to dashboard via window.location...");
                window.location.href = "/dashboard";
            } else {
                setError(t.error_failed);
                setLoading(false);
            }
        } catch (error) {
            console.error("Login error:", error);
            setError(t.error_generic);
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-background p-6">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background pointer-events-none" />

            <m.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-sm relative z-10"
            >
                <div className="glass p-8 rounded-2xl border border-white/10 shadow-2xl space-y-6">
                    <div className="text-center space-y-2">
                        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <Lock className="w-6 h-6 text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight">{t.login_title}</h1>
                        <p className="text-sm text-muted-foreground">{t.subtitle}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="email">{t.email_label}</label>
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
                            <label className="text-sm font-medium" htmlFor="password">{t.password_label}</label>
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
                            {loading ? t.loading_button : t.submit_button}
                        </button>
                    </form>
                </div>
            </m.div>
        </main>
    );
}
