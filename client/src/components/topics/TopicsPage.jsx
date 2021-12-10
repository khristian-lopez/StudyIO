import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Navbar from '../navbar/Navbar.jsx';
import TopicCard from './components/topicCard.jsx';
import Motivational from'./components/motivation.jsx';
import TopicsModal from './Modal/TopicsModal.jsx';

const mock = [
  {name: 'Science', url: 'https://i.guim.co.uk/img/media/5cbce71c025dd78ca31d03111bd2ee4453a7029e/0_167_2400_1440/master/2400.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=b44c9a27a5b38c0388b092e5b0291c32', id: 0},
  {name: 'The Arts', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB--J64zOGkFhNPx7naWZQxQhFVVUfZ-3gtA&usqp=CAU://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7iQG9P8XMLQS4RJNFnDLO8164dqCdUqN1qQ&usqp=CAU', id: 1},
  {name: 'Literature', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT650hUko7pspwuYUmrP_Y-PJIiWJjOoVipyw&usqp=CAU', id: 2},
  {name: 'Fitness', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvTWEy8_qDLMNxnlJV48zlNgsNc9pA5jkqfg&usqp=CAU', id: 3},
  {name: 'Math', url: 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_470493341_20001333200092800_398689.jpg', id: 4},
  {name: 'Cooking', url: 'https://cdn.vox-cdn.com/thumbor/6nuGrh340E58tg1mJUoaW5CyKEA=/0x0:5500x3671/1200x800/filters:focal(2310x1396:3190x2276)/cdn.vox-cdn.com/uploads/chorus_image/image/66563372/GettyImages_849177432.0.jpg', id: 5}
]

const TopicsPage = ({user}) => {
  const [topics, setTopics] = useState([]);
  const [search, setSearch] = useState('');
  const [id, setId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = (id) => {
    setId(id);
    setOpenModal(true);
  }
  const handleClose = () => {
    setOpenModal(false);
    setSearch('');
  }

  useEffect (() => {
    // axios.get('api/topics')
    // .then(res=>setTopics(res.data))
    // .catch(err=>console.log(err))
    setTopics(mock);
  },[])

  const searchHandler = (e) => {
    setSearch(e.target.value);
  }

  const submitHandler = (e)=>{
    e.preventDefault();
    setId(null);
    setOpenModal(true);
  }

  return (
    <Container>
    <Navbar user={user}/>
    <Grid container spacing={1}>
      <Grid container item spacing={3}>
        <Grid item xs={3} sx={{marginTop: "auto", marginBottom: "20px"}}>
          <h1>Choose a Topic</h1>
        </Grid>
        <Grid item xs={6}>< Motivational /></Grid>
        <Grid item xs={3} sx={{marginTop: "auto", marginBottom: "20px"}}>
          <form onSubmit={e=>submitHandler(e)}>
            <TextField label="Find a Room" onChange={e=>searchHandler(e)}/>
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
                id={id}
                search={search}
              />
        </Grid>
      </Box>
    </Grid>
    </Container>
  )
}

export default TopicsPage;
