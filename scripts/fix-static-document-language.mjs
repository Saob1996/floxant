import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outputDirectory = join(process.cwd(), "out");
const englishDirectory = join(outputDirectory, "en");
const englishDocuments = [join(outputDirectory, "en.html")];

function collectHtmlFiles(directory) {
  if (!existsSync(directory)) return;

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const entryPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      collectHtmlFiles(entryPath);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      englishDocuments.push(entryPath);
    }
  }
}

collectHtmlFiles(englishDirectory);

const existingDocuments = englishDocuments.filter((filePath) => existsSync(filePath));
if (existingDocuments.length === 0) {
  throw new Error("Static English HTML documents were not found in the export output.");
}

let updatedDocumentCount = 0;
for (const filePath of existingDocuments) {
  const source = readFileSync(filePath, "utf8");
  const corrected = source.replace(/<html lang="de"/, '<html lang="en"');

  if (!corrected.includes('<html lang="en"')) {
    throw new Error(`Unable to verify the English document language for ${filePath}`);
  }

  if (corrected !== source) {
    writeFileSync(filePath, corrected, "utf8");
    updatedDocumentCount += 1;
  }
}

console.log(
  `Verified ${existingDocuments.length} English static HTML documents; corrected ${updatedDocumentCount}.`,
);
