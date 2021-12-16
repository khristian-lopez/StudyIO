const express = require('express');
const axios = require('axios');

const router = express.Router();

const APIurl = 'http://studyio-api-523737087.us-west-1.elb.amazonaws.com';

// Room Info
router.get('/room', (req, res) => {
  axios.get(`${APIurl}/room/${req.query.room_id}`)
    .then(results => {
      res.status(200).send(results.data)
    })
    .catch((err) => res.status(404).send(err));
})

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
  axios.post(`${APIurl}/rooms/create_event`, req.body)
    .then((results) => {
      res.status(201).send('Successfully added event');
    })
    .catch((err) => res.status(404).send(err));
});

// update event - pass in id
router.put('/events', (req, res) => {
  axios.put(`${APIurl}/blahblah`)
    .then((results) => {
      res.status(201).send(`Successfully updated event ${id}`)
    })
    .catch((err) => res.status(404).send(err))
})
// delete event - pass in id
router.delete('/events', (req, res) => {
  axios.delete(`${APIurl}/blahblah`)
    .then((results) => {
      res.status(201).send(`Successfully deleted event ${id}`)
    })
    .catch((err) => res.status(404).send(err))
})

// Goals
router.get('/goals', (req, res) => {
  axios.get(`${APIurl}/rooms/${req.query.room_id}/goals`)
    .then((results) => {
      res.status(200).send(results.data);
    })
    .catch((err) => res.status(404).send(err));
});

router.post('/goals', (req, res) => {
  console.log(req.body)
  axios.post(`${APIurl}/rooms/${req.body.room_id}/goals`, req.body.info)
    .then((results) => {
      res.status(201).send('Successfully added event');
    })
    .catch((err) => res.status(404).send(err));
});

// update goal - pass in id
router.put('/goals', (req, res) => {
  axios.put(`${APIurl}/blahblah`)
    .then((results) => {
      res.status(201).send(`Successfully updated goal ${id}`)
    })
    .catch(err => res.status(404).send(err))
})

// delete goal - pass in id
router.delete('/goals', (req, res) => {
  let id = req.params.goal_id;
  axios.delete(`${APIurl}/rooms/${req.body.room_id}/goals/${id}`)
    .then((results) => {
      res.status(201).send(`Successfully deleted goal ${id}`)
    })
    .catch(err => res.status(404).send(err))
})

// Members
router.get('/members', (req, res) => {
  axios.get(`${APIurl}/rooms/${req.query.room_id}/users`)
    .then((results) => {
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