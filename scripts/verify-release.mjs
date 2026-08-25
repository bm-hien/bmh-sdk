import { readFile } from 'node:fs/promises';

const tag = process.argv[2] ?? '';
const manifest = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
const expected = `v${manifest.version}`;

if (tag !== expected) {
  throw new Error(`Release tag ${JSON.stringify(tag)} must match package version ${JSON.stringify(expected)}.`);
}

console.log(`Release ${tag} matches ${manifest.name}@${manifest.version}.`);
