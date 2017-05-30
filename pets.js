let path = require('path');
let fs = require('fs');

let subCommand = process.argv[2];
let subArg = process.argv[3];

if (!['read', 'create', 'update', 'destroy'].includes(subCommand)) {
  let fileName = path.basename(__filename);
  console.error(`Usage: node ${fileName} [read | create | update | destroy]`);
  process.exit(-1);
}

if (subCommand === 'read') {
  fs.readFile('./pets.json', (err, data) => {
    if (err) throw err;
    var pets = JSON.parse(data);
    if (subArg) {
      console.log(pets[subArg]);
    } else {
      console.log(pets);
    }
  });
}
