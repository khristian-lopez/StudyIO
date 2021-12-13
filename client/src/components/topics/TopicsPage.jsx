import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Navbar from '../navbar/Navbar.jsx';
import TopicCard from './components/topicCard.jsx';
import Motivational from './components/motivation.jsx';
import TopicsModal from './Modal/TopicsModal.jsx';

const TopicsPage = ({ user, setUser }) => {
  const [topics, setTopics] = useState([]);
  const [search, setSearch] = useState('');
  const [currentTopicId, setCurrentTopicId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const searchHandler = (e) => {
    setSearch(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    setCurrentTopicId(null)
    setOpenModal(true)
  }

  const handleOpen = (id) => {
    setCurrentTopicId(Number(id));
    setOpenModal(true);
  }

  const handleClose = () => {
    setOpenModal(false);
    setSearch('');
  }

  useEffect(() => {
    axios.get('/api/topics')
      .then(res => setTopics(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <Container>
      <Navbar user={user} setUser={setUser} />
      <Grid container spacing={1}>
        <Grid container item spacing={3}>
          <Grid item xs={3} sx={{ marginTop: "auto", marginBottom: "20px" }}>
            <h1>Choose a Topic</h1>
          </Grid>
          <Grid item xs={6}>< Motivational /></Grid>
          <Grid item xs={3} sx={{ marginTop: "auto", marginBottom: "20px" }}>
            <form onSubmit={e => submitHandler(e)}>
              <TextField label="Find a Room" onChange={e => searchHandler(e)} />
            </form>
          </Grid>
        </Grid>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid container item spacing={3}>
              {topics.map((topic) => (
                <Grid item xs={4} key={topic.id} onClick={(e) => handleOpen(e.target.name)}>
                  <TopicCard
                    topic={topic.name}
                    pic={topic.url}
                    name={topic.id}
                  />
                </Grid>
              ))}
            </Grid>
            <TopicsModal
              openModal={openModal}
              handleClose={handleClose}
              topicId={currentTopicId}
              topics={topics}
              user={user}
              search={search}
            />
          </Grid>
        </Box>
      </Grid>
    </Container>
  )
}

export default TopicsPage;

// Potential Topics and paired Images
// math:"https://source.unsplash.com/h3kuhYUCE9A"
// science:"https://source.unsplash.com/yS3XM9qx3hQ"
// cooking:"https://source.unsplash.com/uQs1802D0CQ"
// language:"https://source.unsplash.com/wyBUWYgdO1s"
// history:"https://source.unsplash.com/Fo5dTm6ID1Y"
// self-improvement:"https://source.unsplash.com/8R-mXppeakM"
// music:"https://source.unsplash.com/MEL-jJnm7RQ"
// economics:"https://source.unsplash.com/JKUTrJ4vK00"
// programming:"https://source.unsplash.com/cYyqhdbJ9TI"
// exercise:"https://source.unsplash.com/IZOAOjvwhaM"
// art:"https://source.unsplash.com/A2OL6S9zB7o"
// literature:"https://source.unsplash.com/HH4WBGNyltc"
