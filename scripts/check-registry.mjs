import { readFile } from 'node:fs/promises';

const manifest = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
const endpoint = `https://registry.npmjs.org/${encodeURIComponent(manifest.name)}/${encodeURIComponent(manifest.version)}`;
const required = process.argv.includes('--require');
const attempts = required ? 10 : 1;

for (let attempt = 1; attempt <= attempts; attempt += 1) {
  const response = await fetch(endpoint, { headers: { accept: 'application/json' } });
  if (response.ok) {
    const metadata = await response.json();
    if (metadata.name !== manifest.name || metadata.version !== manifest.version || !metadata.dist?.integrity) {
      throw new Error(`Registry metadata for ${manifest.name}@${manifest.version} is incomplete.`);
    }
    process.stdout.write('published=true\n');
    process.exit(0);
  }
  if (response.status !== 404) {
    throw new Error(`Registry check failed with HTTP ${response.status}.`);
  }
  if (attempt < attempts) await new Promise((resolve) => setTimeout(resolve, 3_000));
}

if (required) throw new Error(`${manifest.name}@${manifest.version} is not available from the npm registry.`);
process.stdout.write('published=false\n');
