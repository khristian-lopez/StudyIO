import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import Carousel from 'react-bootstrap/Carousel';
import Navbar from '../navbar/Navbar.jsx';

import TopicCard from './componets/topicCard.jsx';
import Motivational from'./componets/motivation.jsx';


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
    console.log(search); // open room modal with (name = search) query
  }

  const split = Math.floor(topics.length/2)

  return (
    <Container>
    <Navbar user={props.user}/>
    <Grid container spacing={1}>
      <Grid container item spacing={3}>
        <Grid item xs={2}><h1>Choose a Topic</h1></Grid>
        <Grid item xs={4}>< Motivational /></Grid>
        <Grid item xs={2}><TextField label="Find a Room" onChange={e=>searchHandler(e)}/></Grid>
      </Grid>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid container item spacing={3}>
            {topics.slice(0,split).map((topic) => (
              <Grid item xs={4} key={topic.topic_id}>
                <TopicCard
                  topic={topic.topic}
                  pic={topic.pic}
                  clickHandler={() => clickTopic(topic.topic_id)}
                />
              </Grid>
            ))}
          </Grid>
          <Grid container item spacing={3}>
            {topics.slice(split).map((topic) => (
              <Grid item xs={4} key={topic.topic_id}>
                <TopicCard
                  topic={topic.topic}
                  pic={topic.pic}
                  clickHandler={() => clickTopic(topic.topic_id)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>

      {/* <Carousel>
        {topics.map((topic) => (
          <Carousel.Item key={topic.topic_id}>
            <TopicCard
              topic={topic.topic}
              pic={topic.pic}
              clickHandler={() => clickTopic(topic.topic_id)}
            />
          </Carousel.Item>
        ))}
      </Carousel> */}

    </Grid>
    </Container>
  )
}

export default TopicsPage;