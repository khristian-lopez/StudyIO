const express = require('express');
const axios = require('axios');

const router = express.Router();

const APIurl = 'http://studyio-api-523737087.us-west-1.elb.amazonaws.com';

// Messages
router.get('/messages', (req, res) => {
  axios.get(`${APIurl}/rooms/${req.query.room_id}/messages`)
    .then((results) => {
      res.status(200).send(results.data);
    })
    .catch((err) => res.status(404).send(err));
});

router.post('/messages', (req, res) => {
  axios.post(`${APIurl}/rooms/${req.body.room}/messages`, req.body.message)
    .then((results) => {
      res.status(201).send('Successfully posted');
    })
    .catch((err) => res.status(404).send(err));
});

// Events
router.get('/events', (req, res) => {
  axios.get(`${APIurl}/rooms/${req.query.room_id}/events`)
    .then((results) => {
      res.status(200).send(results.data);
    })
    .catch((err) => res.status(404).send(err));
});

router.post('/events', (req, res) => {
  axios.get(`${APIurl}/rooms/${roomId}/events`)
    .then((results) => {
      res.status(201).send(results.data);
    })
    .catch((err) => res.status(404).send(err));
});

// Goals
router.get('/goals', (req, res) => {
  axios.get(`${APIurl}/rooms/${req.query.room_id}/goals`)
    .then((results) => {
      res.status(200).send(results.data);
    })
    .catch((err) => res.status(404).send(err));
});

router.post('/goals', (req, res) => {
  axios.get(`${APIurl}/rooms/${roomId}/goals`)
    .then((data) => {
      res.status(201).send(data.data);
    })
    .catch((err) => res.status(404).send(err));
});

// Members
router.get('/members', (req, res) => {
  console.log(req.query.room_id)
  axios.get(`${APIurl}/rooms/${req.query.room_id}/users`)
    .then((results) => {
      console.log(results.data)
      res.status(200).send(results.data);
    })
    .catch((err) => res.status(404).send(err));
});

// need to figure out how to add users to room when clicking invite
router.post('/members', (req, res) => {
  axios.get(`${APIurl}/rooms/${req.query.room_id}/users`)
    .then((data) => {
      res.status(201).send(data.data);
    })
    .catch((err) => res.status(404).send(err));
});

module.exports = router;