const express = require('express');
const quote = require('./routes/quote.js');
const topics = require('./routes/topics.js');
const rooms = require('./routes/rooms.js')
const navbar = require('./routes/navbar.js');
const files = require('./routes/files.js');

const router = express.Router();

// put your routes here and route it to your file
router.use('/quote', quote);
router.use('/topics', topics);
router.use('/rooms', rooms);
router.use('/navbar', navbar);
router.use('/files', files);

module.exports = router;