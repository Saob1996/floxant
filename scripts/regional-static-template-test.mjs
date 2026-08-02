#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const notFoundMarker = "NEXT_NOT_FOUND_REGIONAL_STATIC_TEMPLATE_TEST";

const genericModule = new Proxy(() => null, {
  get(_target, property) {
    if (property === "__esModule") return false;
    if (property === "then") return undefined;
    return genericModule;
  },
  apply() {
    return genericModule;
  },
});

function loadPageModule(relativePath) {
  const output = ts.transpileModule(read(relativePath), {
    compilerOptions: {
      esModuleInterop: true,
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
    fileName: relativePath,
  }).outputText;
  const runtimeModule = { exports: {} };
  const localRequire = (specifier) => {
    if (specifier === "next/navigation") {
      return {
        notFound() {
          throw new Error(notFoundMarker);
        },
      };
    }
    return genericModule;
  };
  const execute = new Function("require", "module", "exports", output);
  execute(localRequire, runtimeModule, runtimeModule.exports);
  return runtimeModule.exports;
}

const cases = [
  {
    file: "app/angebote/[slug]/page.tsx",
    duesseldorfSlug: "reinigung-duesseldorf-kosten",
    blockedDuesseldorfSlugs: ["umzug-duesseldorf-kosten", "entsorgung-duesseldorf-kosten"],
  },
  {
    file: "app/guenstig/[slug]/page.tsx",
    duesseldorfSlug: "reinigung-duesseldorf",
    blockedDuesseldorfSlugs: ["umzug-duesseldorf", "entsorgung-duesseldorf"],
  },
  {
    file: "app/wissen/[slug]/page.tsx",
    duesseldorfSlug: "reinigung-duesseldorf",
    blockedDuesseldorfSlugs: ["umzug-duesseldorf", "entruempelung-duesseldorf"],
  },
];

for (const templateCase of cases) {
  const pageModule = loadPageModule(templateCase.file);
  const generatedSlugs = pageModule.generateStaticParams().map(({ slug }) => slug);
  const duesseldorfSlugs = generatedSlugs.filter((slug) => slug.includes("duesseldorf"));

  assert.equal(pageModule.dynamicParams, false, `${templateCase.file} must reject unknown params.`);
  assert.equal(new Set(generatedSlugs).size, generatedSlugs.length, `${templateCase.file} generated duplicate slugs.`);
  assert.deepEqual(
    duesseldorfSlugs,
    [templateCase.duesseldorfSlug],
    `${templateCase.file} may generate only its Düsseldorf cleaning route.`,
  );

  for (const blockedSlug of templateCase.blockedDuesseldorfSlugs) {
    assert(!generatedSlugs.includes(blockedSlug), `${templateCase.file} generated forbidden ${blockedSlug}.`);
    await assert.rejects(
      pageModule.generateMetadata({ params: Promise.resolve({ slug: blockedSlug }) }),
      new RegExp(notFoundMarker),
      `${templateCase.file} metadata must reject ${blockedSlug}.`,
    );
    await assert.rejects(
      pageModule.default({ params: Promise.resolve({ slug: blockedSlug }) }),
      new RegExp(notFoundMarker),
      `${templateCase.file} renderer must reject ${blockedSlug}.`,
    );
  }
}

const offerCheckSource = read("app/angebot-guenstiger-pruefen/page.tsx");
assert.match(offerCheckSource, /quote-check requests in Düsseldorf/);
assert.match(offerCheckSource, /Moving, house-clearance and transport requests are handled through/);
assert.doesNotMatch(offerCheckSource, /Düsseldorf disposal|separate disposal route/);
assert.doesNotMatch(
  offerCheckSource,
  /(?:moving|house clearance)[\s\S]{0,160}requests in\s+Düsseldorf and Regensburg/i,
);

console.log("REGIONAL_STATIC_TEMPLATE_STATUS=PASS templates=3 duesseldorfService=reinigung");
