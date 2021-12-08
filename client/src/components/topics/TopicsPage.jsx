import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Carousel from 'react-bootstrap/Carousel'
import TopicCard from './componets/topicCard.jsx';



const mock = [
  {topic: 'test1', pic: 'url1', topic_id: 0},
  {topic: 'test2', pic: 'url2', topic_id: 1},
  {topic: 'test3', pic: 'url3', topic_id: 2},
  {topic: 'test4', pic: 'url4', topic_id: 3}
]

const TopicsPage = (props) => {
  const [topics, setTopics] = useState([]);
  const [search, setSearch] = useState('');

  useEffect (() => {
    // axios.get('/topics')
    // .then(res=>setTopics(res.data))
    // .catch(err=>console.log(err))
    setTopics(mock);
  })

  const clickTopic = (id) => {
    console.log(id) // open room modal with topic_id
  }

  const searchHandler = (e) => {
    setSearch(e.target.value);
    console.log(search); // open room modal with name = search query
  }

  return (
    <Container>
      <h1>Topics Page</h1>
      <TextField fullWidth label="Find a Room" id="fullWidth" onChange={e=>searchHandler(e)}/>
      <Carousel>
        {topics.map((topic) => (
          <Carousel.Item key={topic.topic_id}>
            <TopicCard
              topic={topic.topic}
              pic={topic.pic}
              clickHandler={() => clickTopic(topic.topic_id)}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  )
}

export default TopicsPage;