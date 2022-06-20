import * as fs from 'fs';

fs.copyFileSync('./api.d.ts', './lib/api.d.ts');
fs.rmSync('./lib/after_build.d.ts')
fs.rmSync('./lib/after_build.js')
fs.rmSync('./lib/test.js')
fs.rmSync('./lib/test.d.ts')