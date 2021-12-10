const express = require('express');
const axios = require('axios');
// const url = // query our database;
// expected result: an array of rooms that match topic id or name in the database:
// {id: Number, name: String, thumbnail: String }


const router = express.Router();

//Search by name for specific room
router.get('name/:name', (req, res) => {
  axios.get(url)
    .then((data) => {
      res.send(data.data).status(200);
    })
    .catch((err) => res.send(err).status(500));
});

//Get array of rooms by Topic ID
router.get('topic/:id', (req, res) => {
  axios.get(url)
    .then((data) => {
      res.send(data.data).status(200);
    })
    .catch((err) => res.send(err).status(500));
});

//Post new room to DB ({isPrivate: bool, maxUsers: number, name: string, thumbnail: String})
router.post('/', (req, res) => {
  axios.post(url, req.body)
    .then((data) => {
      res.send(data.data).status(201);
    })
    .catch((err) => res.send(err).status(500));
});

module.exports = router;