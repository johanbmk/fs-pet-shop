let path = require('path');
let fs = require('fs');

let fileName = path.basename(process.argv[1]);
let subCommand = process.argv[2];
let subArg = process.argv[3];

if (!['read', 'create', 'update', 'destroy'].includes(subCommand)) {
  console.error(`Usage: node ${fileName} [read | create | update | destroy]`);
  process.exit(-1);
}

if (subCommand === 'read') {
  fs.readFile('./pets.json', (err, data) => {
    if (err) throw err;
    var pets = JSON.parse(data);
    if (subArg) {
      if (subArg < 0 || subArg >= pets.length) {
        console.error(`Usage: node ${fileName} read INDEX`);
        process.exit(-1);
      } else {
        console.log(pets[subArg]);
      }
    } else {
      console.log(pets);
    }
  });
}
