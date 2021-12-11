const express = require('express');
const axios = require('axios');
const url = require('../../config.js').api_url // query our database;
// expected result: an array of all topics in the database {name: String, url: String, id: Number}

const router = express.Router();

router.get('/', (req, res) => {
  axios.get(url + '/topics')
    .then((data) => { res.send(data.data).status(200); })
    .catch((err) => res.send(err).status(500));
});

module.exports = router;