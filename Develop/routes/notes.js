const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) =>
  res.status(200).sendFile(path.join(__dirname, '../public/notes.html'))
);

module.exports = router