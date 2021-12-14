import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import axios from 'axios';

import Navbar from '../navbar/Navbar.jsx';
import TopicCard from './components/topicCard.jsx';
import Motivational from './components/motivation.jsx';
import TopicsModal from './Modal/TopicsModal.jsx';

const TopicsPage = (props) => {
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
    setSearch('');
    setOpenModal(false);
  }

  useEffect(() => {
    axios.get('/api/topics')
      .then(res => setTopics(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <Container maxWidth="1270px">
        <Grid sx={{ marginTop: "auto", marginBottom: "20px" }}>
          <Navbar 
            userId={props.userId}
            setUserId={props.setUserId}
            userName={props.userName}
            setUserName={props.setUserName}
            login={props.login}
            setLogin={props.setLogin}
          />
          <Box container sx={rowOneStyle}>
            <Grid item xs={2} sx={{ marginBottom: "50" }}>
              <h1 >Choose a Topic</h1>
            </Grid>
            <Grid item xs={6} sx={{ overflowX: "visible" }} >
              <Motivational />
            </Grid>
            <Box sx={searchStyle}>
              <SearchIcon sx={{ mr: 1, my: 0.5 }} />
              <form onSubmit={e => submitHandler(e)}>
                <TextField
                  variant="standard"
                  label="Find a Room"
                  size="large"
                  sx={{ width: "260px" }}
                  onChange={e => searchHandler(e)}
                />
              </form>
            </Box>
          </Box>
        </Grid>
        <Box container style={boxStyle}>
          {topics.map((topic) => (
            <Box item
              sx={{ margin: "5px", padding: "5px", width: "300px" }}
              md={3} xl={4}
              key={topic.id}
              onClick={(e) => handleOpen(e.target.name)}
            >
              <TopicCard
                topic={topic.name}
                pic={topic.url}
                name={topic.id}
              />
            </Box>
          ))}
        </Box>
        <TopicsModal
          openModal={openModal}
          handleClose={handleClose}
          topicId={currentTopicId}
          topics={topics}
          user={props.userId}
          search={search}
        />
      </Container>
    </div>
  )
}

export default TopicsPage;

const rowOneStyle = {
  display: "flex", 
  flexDirection: "row", 
  justifyContent: "space-evenly", 
  overflowX: "visible", 
  margin: "3px", 
  padding: "3px"
}

const searchStyle = {
  display: 'flex', 
  alignItems: 'flex-end', 
  mr: 5, 
  mb: "auto"
}

const boxStyle = {
  display: "flex", 
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center", 
  overflowX: "visible",
  margin: "3px",
  padding: "3px"
}