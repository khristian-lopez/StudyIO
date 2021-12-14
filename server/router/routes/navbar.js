const express = require('express');
const axios = require('axios');
const router = express.Router();

const APIurl = ''

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


router.get('/activeRooms', (req, res) => {
  // needs user id as a param to query for active rooms of that user
  res.status(200).send(roomsMockData) // to remove once back end set up

  // axios.get(APIurl).then((results) => {
  //     res.status(200).send(results.data);
  //   })
  //   .catch((err) => res.send(err).status(404));
});

router.get('/archivedRooms', (req, res) => {
  // needs user id as a param to query for archived rooms of that user
  res.status(200).send(archivedRoomsMockData) // to remove once back end set up

  // axios.get(APIurl).then((results) => {
  //     res.status(200).send(results.data);
  //   })
  //   .catch((err) => res.send(err).status(404));
});

router.put('/archive', (req, res) => {
  // needs room id to change that room to archived
  axios.put(`${APIurl}/toggle-archive`, { room_id: req.body.roomId }).then((results) => {
    res.status(204).send('put archive');
  })
    .catch((err) => res.send(err).status(404));
});

router.put('/reactivate', (req, res) => {
  // needs room id to change that room to archived
  axios.put(`${APIurl}/toggle-archive`, { room_id: req.body.roomId }).then((results) => {
    res.status(204).send('put archive');
  })
    .catch((err) => res.send(err).status(404));
});

module.exports = router;