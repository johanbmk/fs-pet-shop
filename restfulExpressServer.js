const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // npm i body-parser
const morgan = require('morgan'); // npm i morgan
const fs = require('fs');

const DB_FILE = './pets.json';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('short'));


// Create
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
    fs.readFile(DB_FILE, 'utf8', (err, data) => {
      if (err) {
        console.error(err.stack);
        return res.sendStatus(500);
      }
      let pets = JSON.parse(data);
      pets.push(newPet);
      let json = JSON.stringify(pets);
      fs.writeFile(DB_FILE, json, 'utf8', (err) => {
        if (err) {
          console.error(err.stack);
          return res.sendStatus(500);
        }
        res.status(200).send(newPet);
      });
    });
  }
});


// Read
app.get('/pets/:index', (req, res) => {
  fs.readFile(DB_FILE, 'utf8', (err, data) => {
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


// Update
app.patch('/pets/:index', (req, res) => {
  fs.readFile(DB_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }
    let pets = JSON.parse(data);
    let index = req.params.index;
    if (index < 0 || index >= pets.length) {
      return res.sendStatus(404);
    }
    for (let key in req.body) {
      // Data validation
      if (key === 'age') {
        if (isNaN(req.body.age)) {
          res.status(400);
          res.set('Content-Type', 'text/plain');
          return res.send('Bad Request');
        } else {
          req.body.age = Number(req.body.age);
        }
      }
      // Apply updates
      pets[index][key] = req.body[key];
    }
    // Write to database
    let json = JSON.stringify(pets);
    fs.writeFile(DB_FILE, json, 'utf8', (err) => {
      if (err) {
        console.error(err.stack);
        return res.sendStatus(500);
      }
      res.send(pets[index]);
    });
  });
});


// Delete
app.delete('/pets/:index', (req, res) => {
  fs.readFile(DB_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }
    let pets = JSON.parse(data);
    let index = req.params.index;
    if (index < 0 || index >= pets.length) {
      return res.sendStatus(404);
    }
    var deleted = pets.splice(index, 1);
    let json = JSON.stringify(pets);
    fs.writeFile(DB_FILE, json, 'utf8', (err) => {
      if (err) {
        console.error(err.stack);
        return res.sendStatus(500);
      }
      res.send(deleted[0]);
    });
  });
});


// Query
app.get('/pets', (req, res) => {
  fs.readFile(DB_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }
    let pets = JSON.parse(data);
    res.send(pets);
  });
});


app.use((req, res) => {
  res.sendStatus(404);
});


app.listen(8000, () => {
  let now = new Date();
  console.log(`${now}: Listening on port 8000`);
});


module.exports = app;
