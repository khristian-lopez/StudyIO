const express = require('express');
const axios = require('axios');
const url = require('../../config.js').api_url
// expected result: an array of rooms that match topic id or name in the database:
// {id: Number, name: String, thumbnail: String }

const router = express.Router();

//Search by name for specific room
router.get('/name/:name', (req, res) => {
  axios.get(url)
    .then((data) => { res.send(data.data).status(200); })
    .catch((err) => res.send(err).status(500));
});

//Get array of rooms by Topic ID
router.get('/topic/:topicId/rooms', (req, res) => {
  axios.get(url + `/topic/${req.params.topicId}/rooms`)
    .then((data) => { res.send(data.data).status(200); })
    .catch((err) => res.send(err).status(500));
});

//Post new room to DB ({name: string, topic_id: number, thumbnail: string, max_users: number, is_private: bool, admin_id: number})
router.post('/', (req, res) => {
  axios.post(url, req.body)
    .then((data) => {
      res.send(data.data).status(201);
    })
    .catch((err) => res.send(err).status(500));
});

module.exports = router;