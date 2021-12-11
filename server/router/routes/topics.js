const express = require('express');
const axios = require('axios');
// const url = // query our database;
// expected result: an array of all topics in the database {name: String, url: String, id: Number}

const mock = [
  { name: 'Science', url: 'https://i.guim.co.uk/img/media/5cbce71c025dd78ca31d03111bd2ee4453a7029e/0_167_2400_1440/master/2400.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=b44c9a27a5b38c0388b092e5b0291c32', id: 0 },
  { name: 'The Arts', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB--J64zOGkFhNPx7naWZQxQhFVVUfZ-3gtA&usqp=CAU://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7iQG9P8XMLQS4RJNFnDLO8164dqCdUqN1qQ&usqp=CAU', id: 1 },
  { name: 'Literature', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT650hUko7pspwuYUmrP_Y-PJIiWJjOoVipyw&usqp=CAU', id: 2 },
  { name: 'Fitness', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvTWEy8_qDLMNxnlJV48zlNgsNc9pA5jkqfg&usqp=CAU', id: 3 },
  { name: 'Math', url: 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_470493341_20001333200092800_398689.jpg', id: 4 },
  { name: 'Cooking', url: 'https://cdn.vox-cdn.com/thumbor/6nuGrh340E58tg1mJUoaW5CyKEA=/0x0:5500x3671/1200x800/filters:focal(2310x1396:3190x2276)/cdn.vox-cdn.com/uploads/chorus_image/image/66563372/GettyImages_849177432.0.jpg', id: 5 }
]

const router = express.Router();

router.get('/', (req, res) => {
  // axios.get(url)
  //   .then((data) => {
  //     res.send(data.data).status(200);
  //   })
  //   .catch((err) => res.send(err).status(500));
  res.status(200).send(mock);
});

module.exports = router;