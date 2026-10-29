import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, readdirSync, readFileSync } from 'node:fs';

const src = new URL('./', import.meta.url);
const sources = readdirSync(src).filter(name => /\.tsx?$/.test(name) && !name.endsWith('.test.ts'));

test('every image the site points at is in public', () => {
  for (const name of sources) {
    const code = readFileSync(new URL(name, src), 'utf8');
    for (const [, path] of code.matchAll(/['"](\/[\w./-]+\.(?:png|ico|jpe?g|webp|svg))['"]/g)) {
      assert.ok(existsSync(new URL(`../public${path}`, import.meta.url)), `${name} points at ${path}, which isn't in public`);
    }
  }
});

test("none of Windows XP's own icons are left", () => {
  // They came from the winXP clone by way of Convex OS, and they're Microsoft's
  // artwork, which a site with this name shouldn't push its luck with. The
  // Start menu's icons are drawn by scripts/icons now. GitHub's mark stays, for
  // the GitHub links.
  const files = readdirSync(new URL('../public/xp/', import.meta.url)).filter(name => !name.startsWith('.'));
  assert.deepEqual(files, ['github.png']);
});
