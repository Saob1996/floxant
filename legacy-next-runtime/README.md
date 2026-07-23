# Legacy Next.js Runtime

This directory preserves the former Node/server-only App Router routes, private dashboard, authentication flow, PDF/document endpoints, and proxy for history and a possible future private application.

It is intentionally excluded from `tsconfig.json` and is not part of the Cloudflare Pages production build. Do not move these files back into `app/` unless the deployment target once again provides a compatible server runtime and the public static-export guarantees are re-audited.
