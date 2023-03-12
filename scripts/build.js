const fs = require('fs/promises');
const { existsSync } = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

async function cleanLibFolder() {
  const isExists = existsSync('lib');
  if (!isExists) return;
  await fs.rm('lib', { recursive: true });
}

async function getNoneJsxFiles() {
  const files = await recursiveSearch();

  const tsFiles = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (path.extname(file) === '.ts') tsFiles.push(file);
  }

  const jsFiles = tsFiles.map(file => file.replace(/\.ts$/g, '.js'));

  return jsFiles;
}

async function buildTypescript() {
  await execPromise('npx tsc');
}

async function buildWithBabelForWeb() {
  const jsFiles = await getNoneJsxFiles();
  const ignore = jsFiles.map(e => e.replace(/^src/g, 'lib')).join(',');
  await execPromise(`npx babel lib -d lib --out-file-extension .web.js --ignore ${ignore}`);
}

async function recursiveSearch(dirPath = 'src', fileList = []) {
  const files = await fs.readdir(dirPath);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(dirPath, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      await recursiveSearch(filePath, fileList);
      continue;
    }

    fileList.push(filePath);
  }

  return fileList;
}

async function copyAssets() {
  await fs.cp(path.join('src', 'assets'), path.join('lib', 'assets'), { recursive: true });
}

async function cli() {
  try {
    console.log('🧹 Cleaning the "lib" folder ...');
    await cleanLibFolder();
  } catch (error) {
    console.log(error);
    return;
  }

  try {
    console.log('📦 Compiling Typescript files ...');
    await buildTypescript();
  } catch (error) {
    console.log(error);
    return;
  }

  try {
    console.log('📦 Compiling JavaScript files for the Web platform ...');
    await buildWithBabelForWeb();
  } catch (error) {
    console.log(error);
    return;
  }

  try {
    console.log('📄 Copying assets ...');
    await copyAssets();
  } catch (error) {
    console.log(error);
    return;
  }
}

cli();
