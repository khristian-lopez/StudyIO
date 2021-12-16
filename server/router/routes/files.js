const express = require('express');
const axios = require('axios');

const router = express.Router();

const APIurl = require('../../config.js').api_url;

router.get('/:room_id', (req, res) => {
  axios.get(`${APIurl}/rooms/${req.params.room_id}/files`).then((results) => {
      res.status(200).send(results.data);
    })
    .catch((err) => res.status(404).send(err));
});

router.post('/', (req, res) => {
  console.log(req.body)
  axios.post(`${APIurl}/rooms/${req.body.room_id}/files`, req.body.info).then((results) => {
      console.log('got File response');
      console.log(results);
      res.status(201).send('Successfully uploaded');
    })
    .catch((err) => res.status(404).send(err));
});

module.exports = router;