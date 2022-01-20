require('dotenv').config({
  path: './env'
});
const { buildSync } = require('esbuild')

const define = {}

for (const k in process.env) {
  define[`process.env.${k}`] = JSON.stringify(process.env[k])
}

const options = {
  platform: 'node',
  entryPoints: ['./src/index.ts'],
  outfile: './dist/bundle.js',
  bundle: true,
  define,
}

buildSync(options);
