import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { execFile } from 'node:child_process';

const exec = promisify(execFile);
const root = new URL('..', import.meta.url);
const temporary = await mkdtemp(join(tmpdir(), 'bmh-bot-package-'));
const manifest = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));

try {
  const { stdout } = await exec('npm', ['pack', '--json', '--ignore-scripts'], { cwd: root });
  const [packed] = JSON.parse(stdout);
  assert.equal(packed.id, `${manifest.name}@${manifest.version}`);
  const files = new Set(packed.files.map((file) => file.path));
  for (const required of [
    'dist/index.js',
    'dist/index.cjs',
    'dist/index.d.ts',
    'dist/index.d.cts',
    'README.md',
    'LICENSE',
    'package.json',
  ]) {
    assert.ok(files.has(required), `Packed package is missing ${required}.`);
  }
  assert.ok([...files].every((file) => !file.startsWith('src/') && !file.startsWith('tests/')), 'Source or test files leaked into the package.');

  const tarball = join(new URL(root).pathname, packed.filename);
  await exec('npm', ['init', '--yes'], { cwd: temporary });
  await exec('npm', ['install', tarball], { cwd: temporary });
  const esm = await exec('node', ['--input-type=module', '--eval', `import { Bot, TELEGRAM_METHODS } from '${manifest.name}'; if (!(new Bot()) || TELEGRAM_METHODS.length !== 185) process.exit(1);`], { cwd: temporary });
  assert.equal(esm.stderr, '');
  const cjs = await exec('node', ['--eval', `const { Bot, TELEGRAM_UPDATE_TYPES } = require('${manifest.name}'); if (!(new Bot()) || TELEGRAM_UPDATE_TYPES.length !== 27) process.exit(1);`], { cwd: temporary });
  assert.equal(cjs.stderr, '');
  await writeFile(join(temporary, 'consumer.mts'), [
    `import { Bot, TelegramClient, type TelegramUpdate } from '${manifest.name}';`,
    "const bot: Bot = new Bot().command('start', (ctx) => ctx.reply('Hello'));",
    "const client = new TelegramClient('123:test');",
    "const update: TelegramUpdate = { update_id: 1 };",
    'void bot; void client; void update;',
  ].join('\n'));
  await writeFile(join(temporary, 'consumer.cts'), [
    `import sdk = require('${manifest.name}');`,
    'const bot: sdk.Bot = new sdk.Bot();',
    'void bot;',
  ].join('\n'));
  await writeFile(join(temporary, 'tsconfig.json'), JSON.stringify({
    compilerOptions: {
      target: 'ES2022',
      lib: ['ES2022', 'DOM', 'DOM.Iterable'],
      module: 'NodeNext',
      moduleResolution: 'NodeNext',
      strict: true,
      noEmit: true,
      skipLibCheck: false,
    },
    files: ['consumer.mts', 'consumer.cts'],
  }, null, 2));
  const tsc = fileURLToPath(new URL('../node_modules/typescript/bin/tsc', import.meta.url));
  const declarations = await exec(process.execPath, [tsc, '--project', 'tsconfig.json'], { cwd: temporary });
  assert.equal(declarations.stderr, '');
  const installedManifest = JSON.parse(await readFile(join(temporary, 'node_modules', ...manifest.name.split('/'), 'package.json'), 'utf8'));
  assert.equal(installedManifest.name, manifest.name);
  assert.equal(installedManifest.version, manifest.version);
  console.log(`Verified ${packed.filename}: contents, clean installation, ESM/CommonJS runtime, and declarations.`);
  await rm(tarball, { force: true });
} finally {
  await rm(temporary, { recursive: true, force: true });
}
