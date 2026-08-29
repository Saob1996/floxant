#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const registrySource = fs.readFileSync(
  path.join(root, "lib", "local-seo", "service-area-registry.ts"),
  "utf8",
);
const regensburg = JSON.parse(
  fs.readFileSync(path.join(root, "data", "serviceAreas", "regensburgCleaning.json"), "utf8"),
);

const duesseldorfBlock = registrySource.match(
  /const DUESSSELDORF_DISTRICTS = \[([\s\S]*?)\] as const;/,
);
assert.ok(duesseldorfBlock, "Düsseldorfer Stadtteilliste fehlt");
const duesseldorfDistricts = [...duesseldorfBlock[1].matchAll(/"([^"]+)"/g)].map(
  (match) => match[1],
);
assert.equal(duesseldorfDistricts.length, 50, "Düsseldorf muss 50 amtliche Stadtteile enthalten");
assert.equal(new Set(duesseldorfDistricts).size, 50, "Düsseldorfer Stadtteile müssen eindeutig sein");

assert.equal(regensburg.regensburgDistricts.length, 18, "Regensburg muss 18 Stadtbezirke enthalten");
assert.equal(new Set(regensburg.regensburgDistricts).size, 18, "Regensburger Stadtbezirke müssen eindeutig sein");
assert.ok(
  regensburg.regensburgDistricts.includes("Oberisling-Leoprechting-Graß"),
  "Amtlicher Stadtbezirksname Oberisling-Leoprechting-Graß fehlt",
);
assert.ok(
  !regensburg.regensburgDistricts.includes("Oberisling-Graß"),
  "Veraltete Dublette Oberisling-Graß darf nicht als eigener Stadtbezirk geführt werden",
);

const officialDistrictMunicipalities = [
  "Alteglofsheim", "Altenthann", "Aufhausen", "Bach an der Donau", "Barbing",
  "Beratzhausen", "Bernhardswald", "Brennberg", "Brunn", "Deuerling", "Donaustauf",
  "Duggendorf", "Hagelstadt", "Hemau", "Holzheim am Forst", "Kallmünz", "Köfering",
  "Laaber", "Lappersdorf", "Mintraching", "Mötzing", "Neutraubling", "Nittendorf",
  "Obertraubling", "Pentling", "Pettendorf", "Pfakofen", "Pfatter", "Pielenhofen",
  "Regenstauf", "Riekofen", "Schierling", "Sinzing", "Sünching", "Tegernheim",
  "Thalmassing", "Wenzenbach", "Wiesent", "Wolfsegg", "Wörth an der Donau", "Zeitlarn",
];
for (const municipality of officialDistrictMunicipalities) {
  assert.ok(
    regensburg.allowedCitiesAndMunicipalities.includes(municipality),
    `Landkreis-Kommune fehlt: ${municipality}`,
  );
}

assert.match(registrySource, /minimumScoreForReview: 70/);
assert.match(registrySource, /publication: "registry-only"/);
assert.match(registrySource, /coordinates: null/);

process.stdout.write(
  `Servicegebiet-Prüfung erfolgreich: ${duesseldorfDistricts.length} Düsseldorfer Stadtteile, ${regensburg.regensburgDistricts.length} Regensburger Stadtbezirke und ${officialDistrictMunicipalities.length} Landkreis-Kommunen.\n`,
);
