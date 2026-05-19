"use client";

import { m, useReducedMotion } from "framer-motion";

const cities = [
  { name: "Regensburg", x: 260, y: 154, core: true },
  { name: "Nürnberg", x: 174, y: 78, core: false },
  { name: "München", x: 238, y: 262, core: false },
  { name: "Landshut", x: 326, y: 222, core: false },
  { name: "Straubing", x: 354, y: 142, core: false },
  { name: "Passau", x: 434, y: 210, core: false },
  { name: "Augsburg", x: 120, y: 232, core: false },
] as const;

const routes = [
  "M260 154 C230 120 205 94 174 78",
  "M260 154 C252 192 248 226 238 262",
  "M260 154 C286 180 306 204 326 222",
  "M260 154 C292 148 322 144 354 142",
  "M260 154 C326 168 382 190 434 210",
  "M260 154 C204 172 158 204 120 232",
] as const;

export function BavariaRouteMap() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-[1.8rem] border border-white/80 bg-white/78 p-4 shadow-sm shadow-slate-950/5">
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
            Region im Blick
          </div>
          <h3 className="mt-1 text-xl font-bold tracking-[-0.02em] text-slate-950">
            Regensburg als Hub, Bayern als Einsatzraum.
          </h3>
        </div>
        <p className="max-w-xl text-xs leading-5 text-slate-600">
          Regensburg ist der Startpunkt. Ob Ihr Ort passt, klärt FLOXANT nach Strecke,
          Termin und Verfügbarkeit.
        </p>
      </div>

      <svg viewBox="0 0 520 320" role="img" aria-label="FLOXANT Routen von Regensburg zu wichtigen Städten in Bayern" className="h-auto w-full">
        <defs>
          <radialGradient id="routeCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.18" />
          </radialGradient>
          <linearGradient id="routeLine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.88" />
            <stop offset="55%" stopColor="#06b6d4" stopOpacity="0.58" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.72" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="520" height="320" rx="28" fill="#f8fafc" />
        <path d="M60 260 C150 176 260 98 454 66" fill="none" stroke="#e2e8f0" strokeWidth="1" />
        <path d="M72 88 C170 142 278 170 464 132" fill="none" stroke="#e2e8f0" strokeWidth="1" />

        {routes.map((route, index) => (
          <m.path
            key={route}
            d={route}
            fill="none"
            stroke="url(#routeLine)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0.2 }}
            whileInView={prefersReducedMotion ? undefined : { pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 0.9, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}

        {cities.map((city) => (
          <g key={city.name}>
            <circle
              cx={city.x}
              cy={city.y}
              r={city.core ? 18 : 8}
              fill={city.core ? "url(#routeCore)" : "#ffffff"}
              stroke={city.core ? "#2563eb" : "#bfdbfe"}
              strokeWidth={city.core ? 2 : 1.5}
            />
            {city.core ? (
              <circle cx={city.x} cy={city.y} r="7" fill="#ffffff" opacity="0.95" />
            ) : (
              <circle cx={city.x} cy={city.y} r="3" fill="#2563eb" />
            )}
            <text
              x={city.x + (city.core ? 24 : 13)}
              y={city.y + 4}
              fill="#0f172a"
              fontSize={city.core ? "13" : "11"}
              fontWeight={city.core ? "800" : "700"}
            >
              {city.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
