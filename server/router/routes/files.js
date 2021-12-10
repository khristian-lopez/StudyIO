const express = require('express');
const axios = require('axios');

const router = express.Router();

const APIurl = ''

const docsMockData = [
  { id: 1, name: 'Exam 1 Study Guide', url: 'https://bit.ly/3oKHoH6' },
  { id: 2, name: 'lecture 4 notes', url: 'https://bit.ly/3ERo1BO' },
  { id: 3, name: 'cheatsheet', url: 'https://bit.ly/3rSNIhB' }
]

router.get('/', (req, res) => {
  res.status(200).send(docsMockData)
  // axios.get(url).then((results) => {
  //     res.status(200).send(results.data);
  //   })
  //   .catch((err) => res.status(404).send(err));
});

router.post('/', (req, res) => {
  console.log(req.body)
  res.status(200).send('Posted')
  // axios.post(url, req.body).then((results) => {
  //     res.status(201).send(results.data);
  //   })
  //   .catch((err) => res.status(404).send(err));
});

// router.get('/', (req, res) => {
//   axios.get(url).then((results) => {
//       res.status(200).send(results.data);
//     })
//     .catch((err) => res.status(404).send(err));
// });

module.exports = router;