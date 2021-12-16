const express = require('express');
const axios = require('axios');

const router = express.Router();

const APIurl = 'http://studyio-api-523737087.us-west-1.elb.amazonaws.com';

router.get('/', (req, res) => {
  axios.get(`${APIurl}/rooms/${req.query.room_id}/files`).then((results) => {
      res.status(200).send(results.data);
    })
    .catch((err) => res.status(404).send(err));
});

router.post('/', (req, res) => {
  console.log(req.body)
  axios.post(`${APIurl}/rooms/${req.body.room_id}/files`, req.body.info).then((results) => {
      res.status(201).send('Successfully uploaded');
    })
    .catch((err) => res.status(404).send(err));
});

module.exports = router;