let path = require('path');
let fs = require('fs');

let fileName = path.basename(process.argv[1]);
let subCommand = process.argv[2];

if (!['read', 'create', 'update', 'destroy'].includes(subCommand)) {
  console.error(`Usage: node ${fileName} [read | create | update | destroy]`);
  process.exit(-1);
}


function getDataBase(dbFilePath, callback){
  fs.readFile(dbFilePath, (err, data) => {
    if(err) throw err;
    var obj = JSON.parse(data);
    callback(obj);
  });
}


if (subCommand === 'read') {
  getDataBase('./pets.json', pets => {
    let index = process.argv[3];
    if (index) {
      if (index < 0 || index >= pets.length) {
        console.error(`Usage: node ${fileName} read INDEX`);
        process.exit(-1);
      } else {
        console.log(pets[index]);
      }
    } else {
      console.log(pets);
    }
  });
}
