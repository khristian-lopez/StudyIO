const express = require('express');
const axios = require('axios');
// const url = // query our database;
// expected result: an array of rooms that match topic id or name in the database:
// {id: Number, name: String, thumbnail: String }

let testRoomDB = {
  0: { id: 0, name: 'Physics 201', topic_id: 0, thumbnail: '', max_users: 10, is_private: false, admin_id: 0 },
  1: { id: 1, name: 'Biology 101', topic_id: 0, thumbnail: '', max_users: 10, is_private: false, admin_id: 0 },
  2: { id: 2, name: 'Chemistry 1', topic_id: 0, thumbnail: '', max_users: 10, is_private: false, admin_id: 0 },
  3: { id: 3, name: 'Water Coloring', topic_id: 1, thumbnail: '', max_users: 10, is_private: false, admin_id: 0 },
  4: { id: 4, name: 'Oil Painting', topic_id: 1, thumbnail: '', max_users: 10, is_private: false, admin_id: 0 },
  5: { id: 5, name: 'Sculpting', topic_id: 1, thumbnail: '', max_users: 10, is_private: false, admin_id: 0 },
  6: { id: 6, name: 'English', topic_id: 2, thumbnail: '', max_users: 10, is_private: false, admin_id: 0 },
  7: { id: 7, name: 'Spanish', topic_id: 2, thumbnail: '', max_users: 10, is_private: false, admin_id: 0 },
  8: { id: 8, name: 'German', topic_id: 2, thumbnail: '', max_users: 10, is_private: false, admin_id: 0 },
  9: { id: 9, name: 'Japanese', topic_id: 2, thumbnail: '', max_users: 10, is_private: false, admin_id: 0 },
  10: { id: 10, name: 'Cardio', topic_id: 3, thumbnail: '', max_users: 10, is_private: false, admin_id: 0 },
  11: { id: 11, name: 'Yoga', topic_id: 3, thumbnail: '', max_users: 10, is_private: false, admin_id: 0 },
  12: { id: 12, name: 'Weight Lifting', topic_id: 3, thumbnail: '', max_users: 10, is_private: false, admin_id: 0 },
  13: { id: 13, name: 'Calculus', topic_id: 4, thumbnail: '', max_users: 10, is_private: false, admin_id: 0 },
  14: { id: 14, name: 'Algebra', topic_id: 4, thumbnail: '', max_users: 10, is_private: false, admin_id: 0 },
  15: { id: 15, name: 'Pasta', topic_id: 5, thumbnail: '', max_users: 10, is_private: false, admin_id: 0 }
};


const router = express.Router();

//Search by name for specific room
router.get('/room/:name', (req, res) => {
  axios.get(url)
    .then((data) => {
      res.send(data.data).status(200);
    })
    .catch((err) => res.send(err).status(500));
});

//Get array of rooms by Topic ID
router.get('/topic/:topicId', (req, res) => {
  // axios.get(url)
  //   .then((data) => {
  //     res.send(data.data).status(200);
  //   })
  //   .catch((err) => res.send(err).status(500));

  let result = Object.values(testRoomDB).filter(element => element.topic_id === Number(req.params.topicId));
  res.status(200).send(result);
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