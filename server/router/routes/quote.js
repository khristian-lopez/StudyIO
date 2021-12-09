const express = require('express');
const axios = require('axios');
const url = 'https://zenquotes.io/api/today';

const router = express.Router();

router.get('/quote', (req, res) => {
  axios.get(url)
    .then((data) => {
      res.send(data.data).status(200);
    })
    .catch((err) => res.send(err).status(500));
});

module.exports = router;