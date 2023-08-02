const express = require('express');
const path = require('path');
const notes = require('./routes/notes');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// sends this to the notes route
app.use('/notes', notes);

// Middleware to to allow assets from the public folder to a be accessable
app.use(express.static('public'));

app.get('*', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/public/index.html'))
  })

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
