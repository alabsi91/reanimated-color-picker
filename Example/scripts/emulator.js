const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

(async function () {
  let { stdout: devices } = await execPromise('emulator -list-avds');

  devices = devices.trim().split('\r');

  if (devices.length === 0) {
    console.log('No emulators found.');
    process.exit(1);
  }

  execPromise('start /b emulator -avd ' + devices[0], { windowsHide: true });

  console.log(`\nOpening ${devices[0]} emulator...\n`);
  await new Promise(resolve => setTimeout(resolve, 2000));

  process.exit(0);
})();
