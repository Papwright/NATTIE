import { cpSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const sourceServerDir = resolve(root, "dist/server");
const sourceClientAssetsDir = resolve(root, "dist/client/assets");
const targetFunctionDir = resolve(root, ".vercel/output/functions/__server.func");
const targetStaticAssetsDir = resolve(root, ".vercel/output/static/assets");

if (!existsSync(sourceServerDir)) {
  throw new Error(`Missing server build output: ${sourceServerDir}`);
}

if (!existsSync(sourceClientAssetsDir)) {
  throw new Error(`Missing client build output: ${sourceClientAssetsDir}`);
}

mkdirSync(targetFunctionDir, { recursive: true });
mkdirSync(targetStaticAssetsDir, { recursive: true });

cpSync(sourceServerDir, targetFunctionDir, { recursive: true, force: true });
cpSync(sourceClientAssetsDir, targetStaticAssetsDir, { recursive: true, force: true });

console.log(`Synced server output to ${targetFunctionDir}`);
console.log(`Synced client assets to ${targetStaticAssetsDir}`);