const fs = require('fs/promises'),
  path = require('path'),
  util = require('util'),
  { existsSync } = require('fs'),
  { exec } = require('child_process'),
  { resolveTsPaths } = require('resolve-tspaths'),
  execPromise = util.promisify(exec);

const outDir = 'lib',
  sourceDir = 'src',
  modulePath = path.join(outDir, 'module'),
  commonjsPath = path.join(outDir, 'commonjs'),
  typescriptPath = path.join(outDir, 'typescript'),
  outSrc = path.join(outDir, 'src'),
  babelConfigPath = path.join('scripts', 'babel.config.js'),
  babelOptions = `--ignore "${sourceDir}/**/*.d.ts" --extensions ".ts,.tsx" --source-maps --copy-files --no-copy-ignored`;

async function cleanOutDirectory() {
  const isExists = existsSync(outDir);
  if (!isExists) return;
  await fs.rm(outDir, { recursive: true });
}

async function buildTypescript() {
  await execPromise(`npx tsc --declarationDir ${typescriptPath} --emitDeclarationOnly --declaration --declarationMap`);
  await resolveTsPaths({ out: typescriptPath });
}

async function buildModuleJs() {
  process.env.MODULES = '';
  await execPromise(`npx babel --config-file ./${babelConfigPath} --out-dir ${modulePath} ${sourceDir} ${babelOptions}`);
}

async function buildCommonJs() {
  process.env.MODULES = 'commonjs';
  await execPromise(`npx babel --config-file ./${babelConfigPath} --out-dir ${commonjsPath} ${sourceDir} ${babelOptions}`);
}

async function buildSource() {
  await fs.cp(sourceDir, outSrc, { recursive: true });
  await resolveTsPaths({ out: outSrc, ext: ['ts', 'tsx'] });

  const reg = /(import.+from\s+['"][^'"]+)(\.js)(['"])/g;

  const filePaths = await readFilesInFolder(outSrc);
  for (let i = 0; i < filePaths.length; i++) {
    const filePath = filePaths[i];
    const fileText = await fs.readFile(filePath, { encoding: 'utf-8' });
    const newText = fileText.replace(reg, '$1$3');
    await fs.writeFile(filePath, newText, { encoding: 'utf-8' });
  }
}

async function prettier() {
  const buildDir = path.join(outDir, '**/*');
  await execPromise(`npx prettier --write ${buildDir} --ignore-unknown`);
}

async function readFilesInFolder(folderPath) {
  const files = await fs.readdir(folderPath);

  const tsFiles = files.filter(file => {
    const extension = path.extname(file);
    return extension === '.ts' || extension === '.tsx';
  });

  const filePaths = tsFiles.map(file => path.join(folderPath, file));

  const subDirectories = await Promise.all(
    files.map(async file => {
      const filePath = path.join(folderPath, file);
      const stats = await fs.stat(filePath);
      if (stats.isDirectory()) {
        return file;
      }
    })
  );

  const subDirectoryFiles = await Promise.all(
    subDirectories.filter(Boolean).map(async subDirectory => {
      const subDirectoryPath = path.join(folderPath, subDirectory);
      return readFilesInFolder(subDirectoryPath);
    })
  );

  return filePaths.concat(...subDirectoryFiles);
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
    console.log('📄 Copying the source code ...\n');
    await buildSource();
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
