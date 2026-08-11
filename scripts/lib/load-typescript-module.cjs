const fs = require("node:fs");
const Module = require("node:module");
const path = require("node:path");
const ts = require("typescript");

const defaultProjectRoot = path.resolve(__dirname, "..", "..");
const aliasExtensions = [".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".json"];

function isFile(candidate) {
  return fs.existsSync(candidate) && fs.statSync(candidate).isFile();
}

function resolveProjectAlias(projectRoot, request) {
  const base = path.resolve(projectRoot, request.slice(2));
  const candidates = [
    base,
    ...aliasExtensions.map((extension) => `${base}${extension}`),
    ...aliasExtensions.map((extension) => path.join(base, `index${extension}`)),
  ];
  return candidates.find(isFile) || base;
}

function formatDiagnostic(diagnostic, projectRoot) {
  const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
  if (!diagnostic.file || diagnostic.start === undefined) return `TS${diagnostic.code}: ${message}`;
  const position = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
  const relative = path.relative(projectRoot, diagnostic.file.fileName);
  return `${relative}:${position.line + 1}:${position.character + 1} TS${diagnostic.code}: ${message}`;
}

function compileTypeScriptModule(module, filename, projectRoot) {
  const result = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      allowJs: true,
      esModuleInterop: true,
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.CommonJS,
      moduleResolution: ts.ModuleResolutionKind.Node10,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: filename,
    reportDiagnostics: true,
  });
  const errors = (result.diagnostics || []).filter(
    (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error,
  );
  if (errors.length > 0) {
    throw new SyntaxError(
      `TypeScript-Modul konnte nicht geladen werden (${path.relative(projectRoot, filename)}):\n${errors
        .map((diagnostic) => formatDiagnostic(diagnostic, projectRoot))
        .join("\n")}`,
    );
  }
  module._compile(result.outputText, filename);
}

function loadTypeScriptModule(filename, options = {}) {
  const projectRoot = path.resolve(options.projectRoot || defaultProjectRoot);
  const absoluteFilename = path.resolve(filename);
  const originalResolveFilename = Module._resolveFilename;
  const originalLoaders = new Map(
    [".ts", ".tsx"].map((extension) => [
      extension,
      {
        exists: Object.prototype.hasOwnProperty.call(Module._extensions, extension),
        loader: Module._extensions[extension],
      },
    ]),
  );

  try {
    Module._resolveFilename = function resolveFilename(request, parent, isMain, resolveOptions) {
      const resolvedRequest = typeof request === "string" && request.startsWith("@/")
        ? resolveProjectAlias(projectRoot, request)
        : request;
      return originalResolveFilename.call(this, resolvedRequest, parent, isMain, resolveOptions);
    };
    Module._extensions[".ts"] = (module, loadedFilename) =>
      compileTypeScriptModule(module, loadedFilename, projectRoot);
    Module._extensions[".tsx"] = (module, loadedFilename) =>
      compileTypeScriptModule(module, loadedFilename, projectRoot);
    return require(absoluteFilename);
  } finally {
    Module._resolveFilename = originalResolveFilename;
    for (const [extension, original] of originalLoaders) {
      if (original.exists) Module._extensions[extension] = original.loader;
      else delete Module._extensions[extension];
    }
  }
}

module.exports = { loadTypeScriptModule };
