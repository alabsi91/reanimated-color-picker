const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(query) {
  return new Promise(resolve => {
    readline.question(query, resolve);
  });
}

(async function () {
  const toUpdate = await ask('Do you want to update app version? [y/n] : ');
  if (toUpdate === 'y') await updateAppVersion();
  process.exit(0);
})();

async function updateAppVersion() {
  let version, updatedVersion;

  try {
    const data = JSON.parse(await readFile('package.json', 'utf8'));
    version = data.version;
    updatedVersion = version
      .split('.')
      .map((v, i) => (i === 2 ? +v + 1 : v))
      .join('.');
    data.version = updatedVersion;

    await writeFile('package.json', JSON.stringify(data, null, 2));
  } catch (error) {
    console.log(error);
    return;
  }

  try {
    const data = await readFile('android\\app\\build.gradle', 'utf8');
    const updatedData = data.replace(/versionName\s*'.*'/, `versionName '${updatedVersion}'`);

    await writeFile('android\\app\\build.gradle', updatedData);
  } catch (error) {
    console.log(error);
  }

  console.log('\n- App version updated from', version, 'to', updatedVersion, '.\n');
}
