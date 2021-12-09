const express = require('express');
const quote = require('./routes/quote.js');

const router = express.Router();

// put your routes here and route it to your file
router.use('/quote', quote);

module.exports = router;