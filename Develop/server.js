const express = require('express');
const path = require('path');
const fs = require('fs')
const PORT = 3001;
const {nanoid} = require("nanoid");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const readMyFile = () => {
  const data = fs.readFileSync('./db/db.json', 'utf8');
  console.log(data);
  return JSON.parse(data)
}

app.get('/api/notes', (req, res) => {
  const notes = readMyFile()
  res.json(notes);
});


app.post('/api/notes', (req, res) => {
  const notes = readMyFile()
  var newNote = {...req.body, id: nanoid() }
  notes.push(newNote);
  const dataToSave = JSON.stringify(notes)
  fs.writeFileSync('./db/db.json', dataToSave);
  res.sendStatus(201);
})


app.delete("/api/notes/:noteID", (req,res)=> {
  console.log(req.params)
  //read file bc we have an arrray
  // (Look how to filter from an array)

  //make sure you write to save.
})

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
  console.info(`${req.method} request received for notes`);''
});

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/public/index.html'))
  console.info(`${req.method} request received for home page`); 
});

app.get('*', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/public/index.html'))
    console.info(`${req.method} request received for home page`);
  })

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
