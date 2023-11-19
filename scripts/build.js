const fs = require('fs/promises'),
  path = require('path'),
  util = require('util'),
  { existsSync } = require('fs'),
  { exec } = require('child_process'),
  { resolveTsPaths } = require('resolve-tspaths'),
  execPromise = util.promisify(exec);

const sourceDir = 'src',
  assetsDir = 'assets';

const outDir = 'lib',
  moduleOutDir = path.join(outDir, 'module'),
  commonjsOutDir = path.join(outDir, 'commonjs'),
  declarationOutDir = path.join(outDir, 'typescript'),
  srcOutDir = path.join(outDir, 'src');

const babelConfigFilePath = path.join('scripts', 'babel.config.js'),
  babelArgs = `--ignore "${sourceDir}/**/*.d.ts" --extensions ".ts,.tsx" --source-maps --copy-files --no-copy-ignored`;

/** Delete and clean up the output directory if it exists. */
async function cleanOutDirectory() {
  const isExists = existsSync(outDir);
  if (!isExists) return;
  await fs.rm(outDir, { recursive: true });
}

/** Build TypeScript declaration files. */
async function buildTypescript() {
  await execPromise(
    `npx tsc --declarationDir ${declarationOutDir} --composite false --emitDeclarationOnly --declaration --declarationMap`
  );
  await resolveTsPaths({ out: declarationOutDir }); // Resolve import aliases to their corresponding actual paths.
}

/** Build JavaScript ESM (ECMAScript Modules) files. */
async function buildModuleJs() {
  process.env.MODULES = '';
  await execPromise(`npx babel --config-file ./${babelConfigFilePath} --out-dir ${moduleOutDir} ${sourceDir} ${babelArgs}`);
}

/** Build JavaScript CommonJS module files. */
async function buildCommonJs() {
  process.env.MODULES = 'commonjs';
  await execPromise(`npx babel --config-file ./${babelConfigFilePath} --out-dir ${commonjsOutDir} ${sourceDir} ${babelArgs}`);
}

/** Compile the source file using the TypeScript compiler. */
async function buildSource() {
  await fs.cp(sourceDir, srcOutDir, { recursive: true });
  await resolveTsPaths({ out: srcOutDir, ext: ['ts', 'tsx'] }); // Resolve import aliases to their corresponding actual paths.
}

/** Format output files using Prettier. */
async function prettier() {
  const buildDir = path.join(outDir, '**/*');
  await execPromise(`npx prettier --write ${buildDir} --ignore-unknown`);
}

async function build() {
  try {
    console.log(`🧹 Cleaning the "${outDir}" folder ...\n`);
    await cleanOutDirectory();
  } catch (error) {
    console.error('⛔', error);
    process.exit(1);
  }

  try {
    console.log('📦 Generating Typescript .d.ts files ...\n');
    await buildTypescript();
  } catch (error) {
    console.error('⛔', error);
    process.exit(1);
  }

  try {
    console.log('📦 Compiling the source code ...\n');
    await buildSource();
  } catch (error) {
    console.error('⛔', error);
    process.exit(1);
  }

  try {
    console.log('📦 Compiling JavaScript module files ...\n');
    await buildModuleJs();
  } catch (error) {
    console.error('⛔', error);
    process.exit(1);
  }

  try {
    console.log('📦 Compiling JavaScript commonjs files ...\n');
    await buildCommonJs();
  } catch (error) {
    console.error('⛔', error);
    process.exit(1);
  }

  try {
    console.log('💄 Formatting compiled files with Prettier ...\n');
    await prettier();
  } catch (error) {
    console.error('⛔', error);
    process.exit(1);
  }
}

build();
