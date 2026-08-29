const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

const root = process.cwd();
const source = fs.readFileSync(path.join(root, "lib/backhaul-offers.ts"), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  fileName: "lib/backhaul-offers.ts",
}).outputText;
const moduleRecord = { exports: {} };
new Function("require", "module", "exports", compiled)(require, moduleRecord, moduleRecord.exports);

const {
  LEGACY_PUBLIC_BACKHAUL_OFFER_SELECT,
  PUBLIC_BACKHAUL_OFFER_SELECT,
  encodeLegacyBackhaulMetadata,
  mapLegacyBackhaulOfferRow,
  toLegacyBackhaulStatus,
} = moduleRecord.exports;

const offer = {
  id: "5f6f1bc0-3546-49cb-b11d-7ac16cc2ea77",
  routeId: "RF-2026-TEST",
  title: "Test-Rückfahrt nach Regensburg",
  date: "2026-09-10",
  dateEnd: "2026-09-12",
  timeWindow: "08:00–16:00",
  origin: "München",
  destination: "Regensburg",
  intermediateStops: ["Ingolstadt"],
  pickupRadiusKm: 20,
  destinationRadius: "ca. 200 km um Regensburg",
  routeAreas: ["München", "Ingolstadt", "Regensburg"],
  vehicleType: "Transporter",
  availableCapacity: "8 m³",
  availableCubicMeters: 8,
  loadingArea: "3,2 m Ladefläche",
  weightLimitKg: 900,
  requiredHelpers: 2,
  itemTypes: ["Möbel", "Kartons"],
  capacityMode: "empty-return",
  internalNetPrice: 300,
  publicGrossPrice: 476,
  vatRate: 19,
  priceType: "fixed",
  conditions: "Route und Ladezugang müssen passen.",
  publicDescription: "Geplante Rückfahrt mit freier Teilkapazität.",
  publicationStatus: "published",
  priceHint: "476 € brutto",
  fairPriceNote: "Preis gilt nur für den beschriebenen Umfang.",
  status: "active",
  adminNote: "Interne Testnotiz",
  createdAt: "2026-08-29T10:00:00.000Z",
  updatedAt: "2026-08-29T10:00:00.000Z",
};

const encoded = encodeLegacyBackhaulMetadata(offer);
assert.ok(encoded.startsWith("FLOXANT_BACKHAUL_V2:"));
assert.ok(encoded.length < 5000);

const restored = mapLegacyBackhaulOfferRow({
  id: offer.id,
  title: offer.title,
  departure_date: offer.date,
  time_window: offer.timeWindow,
  origin: offer.origin,
  destination: offer.destination,
  destination_radius: offer.destinationRadius,
  route_areas: offer.routeAreas,
  vehicle_type: offer.vehicleType,
  available_capacity: offer.availableCapacity,
  price_hint: offer.priceHint,
  fair_price_note: offer.fairPriceNote,
  status: "active",
  admin_note: encoded,
  created_at: offer.createdAt,
  updated_at: offer.updatedAt,
});

assert.equal(restored.routeId, offer.routeId);
assert.equal(restored.publicationStatus, "published");
assert.equal(restored.publicGrossPrice, 476);
assert.equal(restored.internalNetPrice, 300);
assert.deepEqual(restored.intermediateStops, ["Ingolstadt"]);
assert.equal(toLegacyBackhaulStatus("active", "published"), "active");
assert.equal(toLegacyBackhaulStatus("reserved", "published"), "paused");
assert.equal(toLegacyBackhaulStatus("completed", "unpublished"), "archived");
assert.ok(!LEGACY_PUBLIC_BACKHAUL_OFFER_SELECT.includes("admin_note"));
assert.ok(!PUBLIC_BACKHAUL_OFFER_SELECT.includes("internal_net_price"));

const dashboard = fs.readFileSync(path.join(root, "components/admin-dashboard/AdminDashboard.tsx"), "utf8");
const panel = fs.readFileSync(path.join(root, "components/admin-dashboard/AdminBackhaulPanel.tsx"), "utf8");
const board = fs.readFileSync(path.join(root, "components/BackhaulOffersBoard.tsx"), "utf8");
assert.ok(dashboard.includes("<AdminBackhaulPanel />"));
assert.ok(panel.includes("Veröffentlichen"));
assert.ok(panel.includes("schemaMode === \"legacy\""));
assert.ok(board.includes("LEGACY_PUBLIC_BACKHAUL_OFFER_SELECT"));

console.log("Leerrückfahrt-Test erfolgreich: Dashboard, Veröffentlichung, Legacy-Persistenz und öffentliche Datengrenze geprüft.");
