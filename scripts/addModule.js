const fs = require('fs');

fs.readFile('package.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const newData = JSON.parse(data);
  newData.type = 'module';
  fs.writeFile('package.json', JSON.stringify(newData, null, 2), function (err) {
    if (err) return console.log(err);
    console.log('type module added');
  });
});
