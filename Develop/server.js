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

function removeNote (notes, noteID) {
  return notes.filter((obj) => obj.id !== noteID);
}

app.delete("/api/notes/:noteID", (req, res) => {
  try {
    const notes = readMyFile();
    const noteID = req.params.noteID;
    
    const newArray = removeNote(notes, noteID);
    const dataToSave = JSON.stringify(newArray);
    
    fs.writeFileSync('./db/db.json', dataToSave);
    
    res.status(200).json({ success: true, message: "Note deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "An error occurred while deleting the note." });
  }
});

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
