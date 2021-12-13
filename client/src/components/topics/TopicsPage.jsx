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

const TopicsPage = ({ user, setUser }) => {
  const [topics, setTopics] = useState([]);
  const [search, setSearch] = useState('');
  const [currentTopicId, setCurrentTopicId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = (id) => {
    setCurrentTopicId(id);
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

  const searchHandler = (e) => {
    setSearch(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    setCurrentTopicId(null);
    setOpenModal(true);
  }
  return (
    <div>
      <Container maxWidth="1270px">
        <Grid sx={{ marginTop: "auto", marginBottom: "20px" }}>
          <Navbar user={user} setUser={setUser} />
          <Box container sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", overflowX: "visible", margin: "3px", padding: "3px" }}>
            <Grid item xs={2} sx={{ marginBottom: "50" }}>
              <h1 >Choose a Topic</h1>
            </Grid>
            <Grid item xs={6} sx={{ overflowX: "visible" }} >
              <Motivational />
            </Grid>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', mr: 5, mb: "auto" }}>
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
        {/* <Box container item style={boxStyle}> */}
          {topics.map((topic) => (
            <Box item
              sx={{ margin: "5px", padding: "5px", width: "300px" }}
              // item xs={2}
              md={3} xl={4}
              // xs={12} sm={6} md={3}
              key={topic.id}
              onClick={(e) => handleOpen(e.target.name)}
            >
              <TopicCard
                topic={topic.name}
                pic={topic.url}
                name={topic.id}
              />
              {/* <div style={{ border: "1px solid #000", width: "100px", padding: "5px", margin: "5px" }}>Card 
              </div> */}
            </Box>
          ))}
        </Box>
        {/* </Box> */}
        <TopicsModal
          openModal={openModal}
          handleClose={handleClose}
          topicId={currentTopicId}
          search={search}
          user={user}
        />
      </Container>
    </div>
  )
}

export default TopicsPage;

const boxStyle = {
  display: "flex", 
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center", 
  overflowX: "visible",
  margin: "3px",
  padding: "3px"
}

// return (
  // <Container>
  //   <Navbar user={user} setUser={setUser} />
  //   <Grid container spacing={1}>
  //     <Grid container item spacing={3}>
  //       <Grid item xs={3} sx={{ marginTop: "auto", marginBottom: "20px" }}>
  //         <h1>Choose a Topic</h1>
  //       </Grid>
  //       <Grid item xs={6}>< Motivational /></Grid>
  //       <Grid item xs={3} sx={{ marginTop: "auto", marginBottom: "20px" }}>
  //         <form onSubmit={e => submitHandler(e)}>
  //           <TextField label="Find a Room" onChange={e => searchHandler(e)} />
  //         </form>
  //       </Grid>
  //     </Grid>
  //     <Box sx={{ flexGrow: 1 }}>
  //       <Grid container spacing={1}>
  //         <Grid container item spacing={3}>
  //           {topics.map((topic) => (
  //             <Grid item xs={4} key={topic.id} onClick={(e) => handleOpen(e.target.name)}>
  //               <TopicCard
  //                 topic={topic.name}
  //                 pic={topic.url}
  //                 name={topic.id}
  //               />
  //             </Grid>
  //           ))}
  //         </Grid>
  //         <TopicsModal
  //           openModal={openModal}
  //           handleClose={handleClose}
  //           topicId={currentTopicId}
  //           search={search}
  //           user={user}
  //         />
  //       </Grid>
  //     </Box>
  //   </Grid>
  // </Container>
// )