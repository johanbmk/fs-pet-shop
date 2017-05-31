const express = require('express');
const app = express();
const fs = require('fs');

const DB_FILE = './pets.json';

app.get('/pets', (req, res) => {
  getDataBase(DB_FILE, pets => {
    res.json(pets);
  })
});

app.get('/pets/:index', (req, res) => {
  getDataBase(DB_FILE, pets => {
    let index = req.params.index;
    if (index < 0 || index >= pets.length) {
      res.status(404);
      res.set('content-type','text/plain');
      res.send('Not Found');
    } else {
      res.json(pets[index]);
    }
  })
});

app.listen(8000, () => {
  console.log('Now Listening on port 8000');
});


function getDataBase(dbFilePath, callback){
  fs.readFile(dbFilePath, (err, data) => {
    if(err) throw err;
    let obj = JSON.parse(data);
    callback(obj);
  });
}


module.exports = app;
