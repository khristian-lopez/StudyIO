import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
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
  const [open, setOpen] = useState(false);

  const searchHandler = (e) => {
    setSearch(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if(search.length > 0) {
      setCurrentTopicId(null)
      setOpenModal(true)
    }
  }

  const handleOpen = (id) => {
    setCurrentTopicId(id);
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
    <div style={containerStyle}>
        <Grid sx={{ margin: "90px 60px 40px 60px" }}>
          <Navbar
            userId={props.userId}
            setUserId={props.setUserId}
            userName={props.userName}
            setUserName={props.setUserName}
            login={props.login}
            setLogin={props.setLogin}
            open={open}
            setOpen={setOpen}
          />
          <Box container sx={rowOneStyle}>
            <Grid item xs={2.5} >
              <h1 style={{ textAlign: "center" }}>Choose a Topic</h1>
            </Grid>
            <Grid item xs={6.5} sx={{ overflowX: "visible" }} >
              <Motivational />
            </Grid>
            <Box sx={searchStyle}>
              <SearchIcon sx={{ my: 0.5, mr: 0.5, ml: 3 }} />
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
        <Box style={boxStyle}>
          {topics.map((topic,i) => (
            <Box item
              sx={{ margin: "5px", padding: "5px", width: "300px" }}
              key={topic.id}
              onClick={(e) => handleOpen(i+1)}
            >
              <TopicCard
                topic={topic.name}
                pic={topic.url}
                name={topic.id}
                setCurrentTopicId={setCurrentTopicId}
                openModal={openModal}
                open={open}
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
          open={open}
          setOpen={setOpen}
        />
    </div>
  )
}

export default TopicsPage;

// TODO: create css files
const containerStyle = {
  maxWidth: "1550px",
  margin: "auto"
}

const rowOneStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  overflowX: "visible",
  margin: "3px",
  padding: "3px"
}

const searchStyle = {
  display: 'flex',
  alignItems: 'flex-end',
  marginRight: "3px",
  mb: "auto"
}

const boxStyle = {
  textAlign: "center",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  overflowX: "visible",
  margin: "3px",
  padding: "3px"
}