const notes = require('express').Router();
const path = require('path');

notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
  });


module.exports = notes
