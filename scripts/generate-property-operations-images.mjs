import { mkdir } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const outputDir = path.join(process.cwd(), "public", "assets", "property-operations");

const scenes = [
  {
    slug: "objekt-springer",
    accent: "#38bdf8",
    secondary: "#facc15",
    objects: "radio",
  },
  {
    slug: "urlaubsretter",
    accent: "#fbbf24",
    secondary: "#38bdf8",
    objects: "travel",
  },
  {
    slug: "airbnb-turnover-express",
    accent: "#22c55e",
    secondary: "#60a5fa",
    objects: "apartment",
  },
  {
    slug: "leerstandsmanagement",
    accent: "#a78bfa",
    secondary: "#22d3ee",
    objects: "vacancy",
  },
  {
    slug: "business-errand-service",
    accent: "#fb7185",
    secondary: "#fbbf24",
    objects: "errand",
  },
  {
    slug: "human-api",
    accent: "#2dd4bf",
    secondary: "#60a5fa",
    objects: "api",
  },
  {
    slug: "property-operations",
    accent: "#60a5fa",
    secondary: "#2dd4bf",
    objects: "dashboard",
  },
];

function baseDefs(accent, secondary) {
  return `
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#02050a"/>
        <stop offset="0.55" stop-color="#0a111c"/>
        <stop offset="1" stop-color="#111827"/>
      </linearGradient>
      <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${accent}"/>
        <stop offset="1" stop-color="${secondary}"/>
      </linearGradient>
      <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.90"/>
        <stop offset="1" stop-color="#cbd5e1" stop-opacity="0.72"/>
      </linearGradient>
      <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="30" stdDeviation="30" flood-color="#000000" flood-opacity="0.45"/>
      </filter>
      <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="18" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
  `;
}

function frame(accent, secondary, body) {
  return `
  <svg width="1600" height="1000" viewBox="0 0 1600 1000" xmlns="http://www.w3.org/2000/svg">
    ${baseDefs(accent, secondary)}
    <rect width="1600" height="1000" fill="url(#bg)"/>
    <path d="M0 720 C260 610 420 660 650 570 C870 485 1040 360 1600 300 L1600 1000 L0 1000 Z" fill="${accent}" opacity="0.08"/>
    <path d="M0 820 C250 740 440 800 720 685 C980 580 1130 520 1600 520 L1600 1000 L0 1000 Z" fill="${secondary}" opacity="0.08"/>
    <g opacity="0.22">
      <path d="M110 168 H1450" stroke="#ffffff" stroke-opacity="0.20"/>
      <path d="M110 832 H1450" stroke="#ffffff" stroke-opacity="0.14"/>
      <path d="M238 80 V920" stroke="#ffffff" stroke-opacity="0.08"/>
      <path d="M1270 80 V920" stroke="#ffffff" stroke-opacity="0.08"/>
    </g>
    <g opacity="0.42">
      <rect x="112" y="112" width="1376" height="776" rx="34" fill="none" stroke="#ffffff" stroke-opacity="0.13"/>
      <rect x="142" y="142" width="1316" height="716" rx="26" fill="none" stroke="#ffffff" stroke-opacity="0.08"/>
    </g>
    ${body}
  </svg>`;
}

function checklist(x, y, width, height, accent) {
  return `
    <g filter="url(#softShadow)">
      <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="22" fill="url(#glass)"/>
      <rect x="${x + 34}" y="${y + 42}" width="${width - 68}" height="18" rx="9" fill="#0f172a" opacity="0.88"/>
      ${[0, 1, 2, 3].map((i) => `
        <rect x="${x + 38}" y="${y + 96 + i * 48}" width="22" height="22" rx="6" fill="${accent}" opacity="${i < 2 ? 0.9 : 0.34}"/>
        <rect x="${x + 76}" y="${y + 100 + i * 48}" width="${width - 136 - i * 28}" height="14" rx="7" fill="#64748b" opacity="${i < 2 ? 0.54 : 0.25}"/>
      `).join("")}
    </g>`;
}

function keyShape(x, y, accent) {
  return `
    <g transform="translate(${x} ${y}) rotate(-18)" filter="url(#softShadow)">
      <circle cx="0" cy="0" r="42" fill="none" stroke="${accent}" stroke-width="18"/>
      <rect x="38" y="-10" width="230" height="20" rx="10" fill="${accent}"/>
      <rect x="206" y="-10" width="22" height="74" rx="8" fill="${accent}"/>
      <rect x="248" y="-10" width="22" height="54" rx="8" fill="${accent}"/>
    </g>`;
}

function radioScene(accent, secondary) {
  return frame(accent, secondary, `
    <g transform="translate(850 355)" filter="url(#softShadow)">
      <rect x="0" y="0" width="290" height="430" rx="34" fill="#e5e7eb"/>
      <rect x="48" y="-88" width="48" height="118" rx="20" fill="${accent}"/>
      <rect x="62" y="-145" width="20" height="78" rx="10" fill="${accent}"/>
      <rect x="48" y="56" width="194" height="52" rx="18" fill="#0f172a"/>
      <circle cx="88" cy="185" r="44" fill="url(#accent)"/>
      <circle cx="202" cy="185" r="44" fill="#0f172a" opacity="0.82"/>
      <rect x="54" y="280" width="182" height="18" rx="9" fill="#94a3b8"/>
      <rect x="54" y="322" width="132" height="18" rx="9" fill="#cbd5e1"/>
    </g>
    ${checklist(410, 270, 330, 330, accent)}
    ${keyShape(610, 700, secondary)}
    <g transform="translate(1030 705)" filter="url(#softShadow)">
      <rect x="0" y="0" width="360" height="86" rx="28" fill="#111827"/>
      <rect x="46" y="-72" width="180" height="72" rx="22" fill="#1f2937"/>
      <circle cx="86" cy="88" r="34" fill="#020617"/>
      <circle cx="284" cy="88" r="34" fill="#020617"/>
      <rect x="252" y="22" width="72" height="18" rx="9" fill="${accent}"/>
    </g>
  `);
}

function travelScene(accent, secondary) {
  return frame(accent, secondary, `
    <g transform="translate(910 280)" filter="url(#softShadow)">
      <rect x="0" y="0" width="310" height="450" rx="42" fill="#dbeafe"/>
      <rect x="86" y="-46" width="138" height="70" rx="28" fill="none" stroke="#dbeafe" stroke-width="22"/>
      <rect x="56" y="72" width="198" height="34" rx="17" fill="#0f172a"/>
      <rect x="66" y="150" width="178" height="18" rx="9" fill="#94a3b8"/>
      <rect x="66" y="196" width="130" height="18" rx="9" fill="#cbd5e1"/>
      <circle cx="102" cy="312" r="34" fill="${accent}"/>
      <circle cx="206" cy="312" r="34" fill="${secondary}"/>
    </g>
    <g transform="translate(438 320)" filter="url(#softShadow)">
      <rect x="0" y="0" width="285" height="390" rx="28" fill="#f8fafc"/>
      <rect x="36" y="54" width="210" height="142" rx="24" fill="#1e40af"/>
      <circle cx="142" cy="125" r="48" fill="#dbeafe" opacity="0.75"/>
      <path d="M70 250 H220" stroke="#0f172a" stroke-width="18" stroke-linecap="round"/>
      <path d="M70 292 H190" stroke="#94a3b8" stroke-width="16" stroke-linecap="round"/>
    </g>
    ${checklist(670, 460, 300, 270, secondary)}
    ${keyShape(1040, 760, accent)}
  `);
}

function apartmentScene(accent, secondary) {
  return frame(accent, secondary, `
    <g transform="translate(425 450)" filter="url(#softShadow)">
      <rect x="0" y="0" width="580" height="210" rx="28" fill="#f8fafc"/>
      <rect x="42" y="-82" width="500" height="116" rx="34" fill="#e0f2fe"/>
      <rect x="58" y="-62" width="468" height="78" rx="26" fill="#ffffff"/>
      <rect x="54" y="48" width="472" height="58" rx="22" fill="#dbeafe"/>
      <rect x="54" y="126" width="472" height="34" rx="17" fill="#cbd5e1"/>
    </g>
    ${checklist(990, 312, 282, 310, accent)}
    <g transform="translate(980 675)" filter="url(#softShadow)">
      <rect x="0" y="0" width="250" height="150" rx="26" fill="#111827"/>
      <circle cx="84" cy="76" r="34" fill="url(#accent)"/>
      <rect x="150" y="48" width="64" height="56" rx="16" fill="#e5e7eb"/>
      <circle cx="182" cy="76" r="18" fill="#0f172a"/>
    </g>
    <g transform="translate(350 680)">
      <rect x="0" y="0" width="210" height="40" rx="20" fill="${secondary}" opacity="0.75"/>
      <rect x="250" y="0" width="150" height="40" rx="20" fill="${accent}" opacity="0.75"/>
    </g>
  `);
}

function vacancyScene(accent, secondary) {
  return frame(accent, secondary, `
    <g transform="translate(360 238)" opacity="0.9">
      <rect x="0" y="0" width="520" height="430" rx="16" fill="#111827" stroke="#ffffff" stroke-opacity="0.12"/>
      <rect x="58" y="56" width="170" height="190" rx="10" fill="#dbeafe" opacity="0.26"/>
      <rect x="292" y="56" width="170" height="190" rx="10" fill="#dbeafe" opacity="0.18"/>
      <path d="M0 332 H520" stroke="#ffffff" stroke-opacity="0.18"/>
      <path d="M156 332 L90 430" stroke="#ffffff" stroke-opacity="0.13"/>
      <path d="M360 332 L450 430" stroke="#ffffff" stroke-opacity="0.13"/>
    </g>
    <g transform="translate(920 318)" filter="url(#softShadow)">
      <rect x="0" y="0" width="310" height="420" rx="36" fill="#e5e7eb"/>
      <rect x="34" y="42" width="242" height="186" rx="24" fill="#0f172a"/>
      <rect x="58" y="72" width="92" height="74" rx="16" fill="${accent}" opacity="0.88"/>
      <rect x="168" y="72" width="78" height="74" rx="16" fill="${secondary}" opacity="0.68"/>
      <rect x="54" y="276" width="202" height="18" rx="9" fill="#64748b"/>
      <rect x="54" y="322" width="154" height="18" rx="9" fill="#94a3b8"/>
    </g>
    ${keyShape(730, 735, accent)}
  `);
}

function errandScene(accent, secondary) {
  return frame(accent, secondary, `
    <g transform="translate(420 340)" filter="url(#softShadow)">
      <rect x="0" y="0" width="420" height="320" rx="34" fill="#f8fafc"/>
      <rect x="72" y="-54" width="180" height="76" rx="30" fill="none" stroke="#f8fafc" stroke-width="24"/>
      <rect x="46" y="66" width="322" height="30" rx="15" fill="#0f172a"/>
      <rect x="46" y="130" width="240" height="20" rx="10" fill="#94a3b8"/>
      <rect x="46" y="184" width="292" height="20" rx="10" fill="#cbd5e1"/>
      <rect x="286" y="242" width="62" height="34" rx="17" fill="${accent}"/>
    </g>
    <g transform="translate(900 305)" filter="url(#softShadow)">
      <rect x="0" y="0" width="290" height="350" rx="26" fill="#111827"/>
      <rect x="42" y="52" width="206" height="74" rx="18" fill="${secondary}" opacity="0.86"/>
      <rect x="42" y="166" width="206" height="18" rx="9" fill="#cbd5e1" opacity="0.58"/>
      <rect x="42" y="214" width="156" height="18" rx="9" fill="#cbd5e1" opacity="0.36"/>
      <circle cx="214" cy="270" r="36" fill="${accent}"/>
    </g>
    ${keyShape(1040, 720, secondary)}
  `);
}

function apiScene(accent, secondary) {
  return frame(accent, secondary, `
    <g transform="translate(525 255)" filter="url(#softShadow)">
      <rect x="0" y="0" width="330" height="560" rx="54" fill="#e5e7eb"/>
      <rect x="34" y="48" width="262" height="464" rx="34" fill="#0f172a"/>
      <rect x="66" y="88" width="198" height="110" rx="24" fill="${accent}" opacity="0.88"/>
      <rect x="66" y="242" width="198" height="22" rx="11" fill="#94a3b8"/>
      <rect x="66" y="298" width="146" height="22" rx="11" fill="#64748b"/>
      <rect x="66" y="362" width="76" height="76" rx="22" fill="${secondary}"/>
      <rect x="166" y="362" width="76" height="76" rx="22" fill="#ffffff" opacity="0.78"/>
    </g>
    ${checklist(930, 342, 330, 330, accent)}
    <g opacity="0.55">
      <path d="M855 492 C910 468 914 430 930 410" stroke="${accent}" stroke-width="8" stroke-linecap="round" fill="none"/>
      <path d="M855 570 C930 596 946 640 1010 658" stroke="${secondary}" stroke-width="8" stroke-linecap="round" fill="none"/>
      <circle cx="930" cy="410" r="12" fill="${accent}"/>
      <circle cx="1010" cy="658" r="12" fill="${secondary}"/>
    </g>
  `);
}

function dashboardScene(accent, secondary) {
  return frame(accent, secondary, `
    <g transform="translate(330 250)" filter="url(#softShadow)">
      <rect x="0" y="0" width="630" height="420" rx="34" fill="#f8fafc"/>
      <rect x="38" y="42" width="554" height="58" rx="20" fill="#0f172a"/>
      <rect x="48" y="146" width="150" height="112" rx="22" fill="${accent}" opacity="0.88"/>
      <rect x="232" y="146" width="150" height="112" rx="22" fill="${secondary}" opacity="0.74"/>
      <rect x="416" y="146" width="136" height="112" rx="22" fill="#94a3b8" opacity="0.50"/>
      <rect x="48" y="306" width="504" height="18" rx="9" fill="#64748b"/>
      <rect x="48" y="350" width="382" height="18" rx="9" fill="#94a3b8"/>
    </g>
    <g transform="translate(1030 330)" filter="url(#softShadow)">
      <rect x="0" y="0" width="270" height="360" rx="28" fill="#111827"/>
      ${[0, 1, 2, 3].map((i) => `
        <rect x="44" y="${48 + i * 68}" width="150" height="18" rx="9" fill="#cbd5e1" opacity="${0.72 - i * 0.08}"/>
        <circle cx="214" cy="${57 + i * 68}" r="16" fill="${i % 2 === 0 ? accent : secondary}"/>
      `).join("")}
    </g>
    ${keyShape(760, 760, secondary)}
  `);
}

function renderScene(scene) {
  switch (scene.objects) {
    case "radio":
      return radioScene(scene.accent, scene.secondary);
    case "travel":
      return travelScene(scene.accent, scene.secondary);
    case "apartment":
      return apartmentScene(scene.accent, scene.secondary);
    case "vacancy":
      return vacancyScene(scene.accent, scene.secondary);
    case "errand":
      return errandScene(scene.accent, scene.secondary);
    case "api":
      return apiScene(scene.accent, scene.secondary);
    case "dashboard":
      return dashboardScene(scene.accent, scene.secondary);
    default:
      throw new Error(`Unknown scene: ${scene.objects}`);
  }
}

await mkdir(outputDir, { recursive: true });

for (const scene of scenes) {
  const svg = renderScene(scene);
  const file = path.join(outputDir, `${scene.slug}.png`);
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(file);
  console.log(file);
}
