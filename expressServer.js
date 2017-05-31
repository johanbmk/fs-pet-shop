const express = require('express');
const app = express();

app.get('/pets', (req, res) => {
  let val = [{id: 1, color: 'red'}];
  res.json(val);
});

app.get('/pets/:id', (req, res) => {
  res.send(`You requested ID ${req.params.id}.`);
});

app.listen(8000, () => {
  console.log('Now Listening on port 8000');
});
