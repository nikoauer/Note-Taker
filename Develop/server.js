const express = require('express');
const path = require('path');
const fs = require('fs')
const allNotes = require('./db/db.json')

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/api/notes', (req, res) => {
  res.json(allNotes);
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
  console.info(`${req.method} request received for notes`);''
});

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/public/index.html'))
  console.info(`${req.method} request received for notes`); 
});

app.get('*', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/public/index.html'))
    console.info(`${req.method} request received for notes`);
  })

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
