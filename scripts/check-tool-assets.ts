// Fails the build when a tool page points at an image or video its repo no
// longer has, so a deleted screenshot breaks the deploy instead of the page.
// Runs before `npm run build`, after `npm run dates` has synced the mirrors.

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { missingToolAssets } from '../src/tools.ts';
import { syncToolRepos } from './toolRepos.ts';

const run = promisify(execFile);

const problems: string[] = [];
for (const { tool, dir } of await syncToolRepos()) {
  // Reads tree objects only, which the blob-less mirror has.
  const { stdout } = await run('git', ['-C', dir, '-c', 'core.quotePath=false', 'ls-tree', '-r', '--name-only', 'HEAD'], {
    maxBuffer: 64 * 1024 * 1024,
  });
  for (const path of missingToolAssets(tool, new Set(stdout.split('\n')))) {
    problems.push(`${tool.name}: ${path} isn't in github.com/mikecann/${tool.name} on main`);
  }
}

if (problems.length > 0) {
  console.error(
    [
      'Tool pages point at media their repos no longer have:',
      ...problems.map(problem => `  ${problem}`),
      'Add the file back to the tool repo, or point src/tools.ts at one that exists (or drop it).',
    ].join('\n'),
  );
  process.exit(1);
}
console.log('Every tool page image and video is in its repo.');
