const express = require('express');
const axios = require('axios');
const router = express.Router();

const APIurl = require('../../config.js').api_url;

// need to replace archived vs active with just rooms with isArchived field and filter from there on client side or here

let roomsMockData = [
  { room: "Biology 1A", roomId: 2 },
  { room: "Chemistry 2", roomId: 5 },
  { room: "OChem 12C", roomId: 3 },
];

let archivedRoomsMockData = [
  { room: "Intro Bio 1A", roomId: 21 },
  { room: "Alchemy 2", roomId: 1 },
  { room: "Addition 101", roomId: 4 },
];


router.get('/rooms', (req, res) => {
  axios.get(`${APIurl}/user/${req.query.user_id}/rooms`)
    .then((results) => {
      let rooms = { active: [], archived: [] }
      for (room of results.data) {
        if (room.is_archived) rooms.archived.push(room)
        else rooms.active.push(room)
      }
      res.status(200).send(rooms);
    })
    .catch((err) => res.send(err).status(404));
});

router.put('/archive', (req, res) => {
  console.log(req.body.room_id)
  axios.put(`${APIurl}/toggle-archive`, { room_id: req.body.room_id }).then((results) => {
    res.status(204).send('put archive');
  })
    .catch((err) => res.send(err).status(404));
});

router.put('/reactivate', (req, res) => {
  console.log(req.body)
  axios.put(`${APIurl}/toggle-archive`, { room_id: req.body.room_id }).then((results) => {
    res.status(204).send('put reactivated');
  })
    .catch((err) => res.send(err).status(404));
});

module.exports = router;