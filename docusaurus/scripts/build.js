const fs = require('fs');
const { spawn } = require('child_process');

const npx = spawn('node_modules\\.bin\\docusaurus', ['build'], { shell: true });
npx.stdout.pipe(process.stdout);

npx.on('exit', code => {
  if (code === 0) {
    fs.rm('../docs', { recursive: true }, error => {
      console.log('error :', error);

      fs.cp('./build', '../docs', { recursive: true }, err => {
        console.log('error :', err);
      });
    });
  }
});
