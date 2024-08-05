import babel from '@babel/core';
import { existsSync, promises as fs } from 'fs';
import { mkdir } from 'fs/promises';
import { glob } from 'glob';
import path from 'path';
import prettier from 'prettier';
import { resolveTsPaths } from 'resolve-tspaths';
import ts from 'typescript';

const srcDir = 'src'; // source directory
const libDir = 'lib'; // output directory
const assetsDir = path.join(srcDir, 'assets'); // assets directory
const srcOutDir = path.join(libDir, srcDir); // source output directory
const tsLibDir = path.join(libDir, 'typescript'); // typescript output directory
const commonjsDir = path.join(libDir, 'commonjs'); // commonjs output directory
const esmDir = path.join(libDir, 'module'); // module output directory
const prettierConfigPath = '.prettierrc.json';
const tsConfigPath = path.resolve('tsconfig.json');

/** Delete and clean up the output directory. */
async function cleanupOutDirectory() {
  const isExists = existsSync(libDir);
  if (!isExists) return;
  await fs.rm(libDir, { recursive: true });
}

/** Copy the source dir and resolve import aliases. */
async function buildSource() {
  await fs.cp(srcDir, srcOutDir, { recursive: true });
  await resolveTsPaths({ out: srcOutDir, ext: ['ts', 'tsx'] });
}

let tsPathsTmp = null;
/** Get all TypeScript files paths. */
async function getTsFilesPaths() {
  if (tsPathsTmp) return tsPathsTmp;
  tsPathsTmp = await glob(`${libDir}/${srcDir}/**/*.{ts,tsx}`);
  return tsPathsTmp;
}

/** Build TypeScript declaration files. */
async function generateTsDeclarations() {
  const tsConfig = ts.readConfigFile(tsConfigPath, ts.sys.readFile).config;
  tsConfig.compilerOptions.declarationDir = tsLibDir;
  tsConfig.compilerOptions.emitDeclarationOnly = true;
  tsConfig.compilerOptions.declarationMap = true;

  const parsedCommandLine = ts.parseJsonConfigFileContent(tsConfig, ts.sys, path.dirname(tsConfigPath));

  const tsFiles = await getTsFilesPaths();

  const host = ts.createCompilerHost(parsedCommandLine.options);
  const program = ts.createProgram(tsFiles, parsedCommandLine.options, host);
  program.emit();
}

function getBabelOptions(filename, sourceRoot, commonjs = false) {
  return {
    presets: [
      ['@babel/preset-env', { targets: { node: '16' }, useBuiltIns: false, modules: commonjs ? 'commonjs' : false }],
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
    filename,
    sourceRoot,
    sourceMaps: true,
  };
}

/** Build JavaScript ESM (ECMAScript Modules) files. */
async function buildModuleJs() {
  // copy assets
  await fs.cp(assetsDir, path.join(esmDir, path.basename(assetsDir)), { recursive: true });

  const tsFiles = await getTsFilesPaths();

  for (const filePath of tsFiles) {
    const dir = path.dirname(filePath).replace(srcOutDir, ''); // target directory path
    const fileName = path.basename(filePath);
    const fileBaseName = path.basename(fileName, path.extname(fileName)); // without extension
    const fileContent = await fs.readFile(filePath, 'utf8');

    // esm paths
    const esmOutputDir = path.join(esmDir, dir);
    const esmOutputPath = path.join(esmOutputDir, `${fileBaseName}.js`);
    const esmMapOutputPath = path.join(esmOutputDir, `${fileBaseName}.js.map`);
    await mkdir(esmOutputDir, { recursive: true }); // Ensure directories exist

    // Source root relative path for source maps
    const sourceRoot = path.relative(esmOutputDir, path.join(srcOutDir, dir)).replaceAll(path.sep, '/');

    const esmResult = await babel.transformAsync(fileContent, getBabelOptions(fileName, sourceRoot));

    await fs.writeFile(esmOutputPath, esmResult.code, 'utf8');
    if (esmResult.map) await fs.writeFile(esmMapOutputPath, JSON.stringify(esmResult.map), 'utf8');
  }
}

/** Build JavaScript CommonJS module files. */
async function buildCommonJs() {
  // copy assets
  await fs.cp(assetsDir, path.join(commonjsDir, path.basename(assetsDir)), { recursive: true });

  const tsFiles = await getTsFilesPaths();

  for (const filePath of tsFiles) {
    const dir = path.dirname(filePath).replace(srcOutDir, ''); // target directory path
    const fileName = path.basename(filePath);
    const fileBaseName = path.basename(fileName, path.extname(fileName)); // without extension
    const fileContent = await fs.readFile(filePath, 'utf8');

    // commonjs paths
    const commonjsOutputDir = path.join(commonjsDir, dir);
    const commonjsOutputPath = path.join(commonjsOutputDir, `${fileBaseName}.js`);
    const commonjsMapOutputPath = path.join(commonjsOutputDir, `${fileBaseName}.js.map`);
    await mkdir(commonjsOutputDir, { recursive: true }); // Ensure directories exist

    // Source root relative path for source maps
    const sourceRoot = path.relative(commonjsOutputDir, path.join(srcOutDir, dir)).replaceAll(path.sep, '/');

    const commonjsResult = await babel.transformAsync(fileContent, getBabelOptions(fileName, sourceRoot, true));

    await fs.writeFile(commonjsOutputPath, commonjsResult.code, 'utf8');
    if (commonjsResult.map) await fs.writeFile(commonjsMapOutputPath, JSON.stringify(commonjsResult.map), 'utf8');
  }
}

/** Format output files using Prettier. */
async function formatWithPrettier() {
  const files = await glob(libDir + '/**/*.{js,js.map,d.ts.map}');

  const prettierOptions = await prettier.resolveConfig(prettierConfigPath);

  for (const filePath of files) {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const extension = path.extname(filePath);
    prettierOptions.parser = extension === '.map' ? 'json' : 'babel';

    const formatted = await prettier.format(fileContent, prettierOptions);
    await fs.writeFile(filePath, formatted, 'utf8');
  }
}

async function build() {
  try {
    console.log('🧹 Cleaning up the out directory ...\n');
    await cleanupOutDirectory();
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
    console.log('📦 Generating Typescript declarations files ...\n');
    await generateTsDeclarations();
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
    await formatWithPrettier();
  } catch (error) {
    console.error('⛔', error);
    process.exit(1);
  }

  console.log('✅ Build finished!\n');
}

await build();
