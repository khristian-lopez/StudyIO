const express = require('express');
const axios = require('axios');

const router = express.Router();

const APIurl = 'http://studyio-api-523737087.us-west-1.elb.amazonaws.com';

// const docsMockData = [
//   { id: 1, name: 'Exam 1 Study Guide', url: 'https://bit.ly/3oKHoH6' },
//   { id: 2, name: 'lecture 4 notes', url: 'https://bit.ly/3ERo1BO' },
//   { id: 3, name: 'cheatsheet', url: 'https://bit.ly/3rSNIhB' }
// ]

router.get('/', (req, res) => {
  axios.get(`${APIurl}/rooms/${req.query.room_id}/files`).then((results) => {
      res.status(200).send(results.data);
    })
    .catch((err) => res.status(404).send(err));
});

router.post('/', (req, res) => {
  axios.post(`${APIurl}/rooms/${req.body.room_id}/files`, req.body).then((results) => {
      res.status(201).send('Successfully uploaded');
    })
    .catch((err) => res.status(404).send(err));
});

module.exports = router;