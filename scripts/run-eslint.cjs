const { spawnSync } = require("node:child_process");
const path = require("node:path");

const eslintBin = path.join(
  __dirname,
  "..",
  "node_modules",
  "eslint",
  "bin",
  "eslint.js",
);

const result = spawnSync(
  process.execPath,
  [eslintBin, ".", "--ext", ".js,.jsx,.ts,.tsx", "--max-warnings", "0"],
  {
    stdio: "inherit",
    shell: false,
  },
);

if (result.error) {
  console.error(result.error);
}

process.exit(result.status ?? 1);
