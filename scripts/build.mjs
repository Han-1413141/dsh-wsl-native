import { build } from "esbuild";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
await fs.mkdir(new URL("../lib/", import.meta.url), { recursive: true });
await build({
  absWorkingDir: root,
  entryPoints: ["src/worker.mjs"],
  outfile: "lib/worker.mjs",
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node22",
  legalComments: "none",
});
const client = await build({
  absWorkingDir: root,
  entryPoints: ["src/client.jsx"],
  bundle: true,
  platform: "browser",
  format: "cjs",
  target: "es2022",
  minify: true,
  write: false,
  loader: { ".css": "text" },
  external: ["react", "@deepseek-ai/dsh-client-ui-primitives"],
  legalComments: "none",
});
const wrapped = `window.__ModuleLoader__.load({id:"dsh-wsl-native",factory:(require)=>{const module={exports:{}};const exports=module.exports;\n${client.outputFiles[0].text}\nreturn module.exports;}});\n`;
if (Buffer.byteLength(wrapped) > 262144)
  throw new Error("client bundle exceeds DSH size limit");
await fs.writeFile(new URL("../lib/client.js", import.meta.url), wrapped);
console.log(`Client bundle: ${Buffer.byteLength(wrapped)} / 262144 bytes.`);
console.log("Built dsh-wsl-native worker and client.");
