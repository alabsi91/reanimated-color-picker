const fs = require('fs/promises');
const { existsSync } = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

const outDir = 'lib',
  sourceDir = 'src',
  modulePath = path.join(outDir, 'module'),
  commonjsPath = path.join(outDir, 'commonjs'),
  typescriptPath = path.join(outDir, 'typescript'),
  babelModuleConfigPath = path.join('scripts', 'babel-module.json'),
  babelCommonjsConfigPath = path.join('scripts', 'babel-commonjs.json');

async function cleanOutDirectory() {
  const isExists = existsSync(outDir);
  if (!isExists) return;
  await fs.rm(outDir, { recursive: true });
}

async function buildTypescript() {
  await execPromise(`npx tsc --declarationDir ${typescriptPath} --emitDeclarationOnly`);
}

async function buildModuleJs() {
  await execPromise(
    `npx babel --config-file ./${babelModuleConfigPath} --out-dir ${modulePath} ${sourceDir} --extensions ".ts,.tsx" --source-maps --copy-files`
  );
}

async function buildCommonJs() {
  await execPromise(
    `npx babel --config-file ./${babelCommonjsConfigPath} --out-dir ${commonjsPath} ${sourceDir} --extensions ".ts,.tsx" --source-maps --copy-files`
  );
}

async function prettier() {
  const buildDir = path.join(outDir, '**/*.js');
  await execPromise(`npx prettier --write ${buildDir}`);
}

async function build() {
  try {
    console.log(`🧹 Cleaning the "${outDir}" folder ...\n`);
    await cleanOutDirectory();
  } catch (error) {
    console.error('⛔', error.stdout);
    process.exit(1);
  }

  try {
    console.log('📦 Generating Typescript .d.ts files ...\n');
    await buildTypescript();
  } catch (error) {
    console.error('⛔', error.stdout);
    process.exit(1);
  }

  try {
    console.log('📦 Compiling JavaScript module files ...\n');
    await buildModuleJs();
  } catch (error) {
    console.error('⛔', error.stderr);
    process.exit(1);
  }

  try {
    console.log('📦 Compiling JavaScript commonjs files ...\n');
    await buildCommonJs();
  } catch (error) {
    console.error('⛔', error.stderr);
    process.exit(1);
  }

  try {
    console.log('💄 Formating files with Prettier ...\n');
    await prettier();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

build();
