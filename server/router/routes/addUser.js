const express = require('express');
const axios = require('axios');
const url = require('../../config.js').api_url

const router = express.Router();

router.post('/', (req, res) => {
  axios.post(url + '/addUserToRoom', req.body)
    .then((data) => { res.send(data.data).status(200); })
    .catch((err) => res.send(err).status(500));
});

module.exports = router;
