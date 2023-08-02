const express = require('express');
const path = require('path');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to to allow assets from the public folder to a be accessable
app.use(express.static('public'));

const api = require('./routes/index');
app.use('/api', api);

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('*', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/public/index.html'))
  })

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
