const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // npm i body-parser
const fs = require('fs');

const DB_FILE = './pets.json';

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/pets', (req, res) => {
  let {age, kind, name} = req.body;
  if (isNaN(age) || !kind || !name) {
    res.status(400);
    res.set('Content-Type', 'text/plain');
    res.send('Bad Request');
  } else {
    let newPet = {};
    newPet.age = Number(age);
    newPet.kind = kind;
    newPet.name = name;
    fs.readFile(DB_FILE, (err, data) => {
      if (err) {
        console.error(err.stack);
        return res.sendStatus(500);
      }
      let pets = JSON.parse(data);
      pets.push(newPet);
      let json = JSON.stringify(pets);
      fs.writeFile(DB_FILE, json, (err) => {
        if (err) {
          console.error(err.stack);
          return res.sendStatus(500);
        }
        res.send(newPet);
      });
    });
  }
});

app.get('/pets', (req, res) => {
  fs.readFile(DB_FILE, (err, data) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }
    let pets = JSON.parse(data);
    res.send(pets);
  });
});

app.get('/pets/:index', (req, res) => {
  fs.readFile(DB_FILE, (err, data) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }
    let pets = JSON.parse(data);
    let index = req.params.index;
    if (index < 0 || index >= pets.length) {
      res.sendStatus(404);
    } else {
      res.send(pets[index]);
    }
  });
});


app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(8000, () => {
  console.log('Now Listening on port 8000');
});


module.exports = app;
