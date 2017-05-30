let path = require('path');
let fs = require('fs');

let DB_FILE = './pets.json';

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
  getDataBase(DB_FILE, pets => {
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
  })
}

if (subCommand === 'create') {
  let age = process.argv[3];
  let kind = process.argv[4];
  let name = process.argv[5];
  if (isNaN(age) || !kind || !name) {
    console.error(`Usage: node ${fileName} create AGE KIND NAME`);
    process.exit(-1);
  }
  let newPet = {};
  newPet.age = Number(age);
  newPet.kind = kind;
  newPet.name = name;
  getDataBase(DB_FILE, pets => {
    pets.push(newPet);
    let json = JSON.stringify(pets);
    fs.writeFile(DB_FILE, json, (err) => {
      if (err) {
        throw err;
      }
    })
  })
  console.log(newPet);
}
