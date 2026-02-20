import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
    // 1. Method Check
    if (req.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
    }

    // 2. Header Check
    const secretHeader = req.headers.get("x-cron-key");
    if (!secretHeader) {
        return new Response("Unauthorized: Missing Header", { status: 401 });
    }

    // 3. Secret Validation
    const cronSecret = Deno.env.get("CRON_SECRET");
    if (secretHeader !== cronSecret) {
        return new Response("Unauthorized: Invalid Secret", { status: 401 });
    }

    try {
        // 4. Lightweight DB Ping (Read-Only)
        // We just fetch the root of the REST API to ensure the instance is awake.
        // We do NOT query specific tables to avoid permissions issues if not needed.
        const url = Deno.env.get("SUPABASE_URL");
        const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

        if (!url || !key) {
            console.error("Missing Supabase Environment Variables");
            // For security, don't expose internal config issues to the world, just 500
            return new Response("Internal Server Error", { status: 500 });
        }

        const response = await fetch(`${url}/rest/v1/`, {
            method: "GET",
            headers: {
                apikey: key,
                Authorization: `Bearer ${key}`,
            },
        });

        if (!response.ok) {
            // Log the error internally
            const text = await response.text();
            console.error("Keepalive DB Ping Failed:", response.status, text);
            return new Response("alive (db-error)", { status: 200 }); // Still return 200 to cron job if function worked
        }

        return new Response("alive", { status: 200 });

    } catch (error) {
        console.error("Keepalive Error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
});
