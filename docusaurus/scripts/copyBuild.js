const fs = require('fs');

fs.rm('../docs', { recursive: true }, error => {
  if (error) console.log('error :', error);

  fs.cp('./build', '../docs', { recursive: true }, error => {
    if (error) console.log('error :', error);
  });
});
