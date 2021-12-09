const express = require('express');
const quote = require('./routes/quote.js');

const router = express.Router();

router.use('/quote', quote);

module.exports = router;