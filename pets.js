let path = require('path');
let fs = require('fs');

let subCommand = process.argv[2];

if (!['read', 'create', 'update', 'destroy'].includes(subCommand)) {
  let fileName = path.basename(__filename);
  console.error(`Usage: node ${fileName} [read | create | update | destroy]`);
  process.exit(-1);
}

if (subCommand === 'read') {
  fs.readFile('./pets.json', (err, data) => {
    if (err) throw err;
    var pets = JSON.parse(data);
    console.log(pets);
  });
}
