import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const temporaryRoot = mkdtempSync(path.join(tmpdir(), "floxant-calculator-tests-"));
const outputRoot = path.join(temporaryRoot, "compiled");
const typescriptCli = path.join(repositoryRoot, "node_modules", "typescript", "bin", "tsc");
const testSource = path.join(repositoryRoot, "scripts", "calculator-logic-test.ts");

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: repositoryRoot,
    encoding: "utf8",
    stdio: "pipe",
  });
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  if (result.error) process.stderr.write(`Failed to start ${path.basename(command)}: ${result.error.message}\n`);
  if (result.signal) process.stderr.write(`${path.basename(command)} terminated by signal ${result.signal}\n`);
  if (result.status !== 0) process.exitCode = result.status || 1;
  return result.status === 0;
}

try {
  const compiled = run(process.execPath, [
    typescriptCli,
    "--pretty",
    "false",
    "--strict",
    "--target",
    "ES2022",
    "--module",
    "CommonJS",
    "--moduleResolution",
    "Node",
    "--esModuleInterop",
    "--skipLibCheck",
    "--types",
    "node",
    "--rootDir",
    repositoryRoot,
    "--outDir",
    outputRoot,
    testSource,
  ]);

  if (compiled) {
    run(process.execPath, [path.join(outputRoot, "scripts", "calculator-logic-test.js")]);
  }
} finally {
  const resolvedTemporaryRoot = path.resolve(temporaryRoot);
  const resolvedSystemTemp = path.resolve(tmpdir());
  if (
    resolvedTemporaryRoot.startsWith(`${resolvedSystemTemp}${path.sep}`) &&
    path.basename(resolvedTemporaryRoot).startsWith("floxant-calculator-tests-")
  ) {
    rmSync(resolvedTemporaryRoot, { recursive: true, force: true });
  }
}
