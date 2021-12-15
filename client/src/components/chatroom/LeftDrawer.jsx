import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SingleEvent from './SingleEvent.jsx';
import SingleGoal from './SingleGoal.jsx';

import Divider from '@mui/material/Divider';


const leftDrawerSx = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '56px',
  padding: '12px',
}

const sectionSx = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  marginBottom: '24px',
}

const titleSx = {
  fontSize: '1.17em',
  // marginBlockStart: '1em',
  // marginBlockEnd: '1em',
  fontWeight: 'bold',
  marginBottom: '16px',
}

const listSx = {
  display: 'flex',
  flexDirection: 'column',
  fontSize: '14px',
  marginBottom: '16px',
}

const LeftDrawer = (props) => {
  const [events, setEvents] = useState([])
  const [goals, setGoals] = useState([])
  useEffect(() => {
    axios.get('/api/chatroom/events', { params: { room_id: props.room } })
      .then(results => setEvents(results.data))
      .catch(err => console.log(err));

    axios.get('/api/chatroom/goals', { params: { room_id: props.room } })
      .then(results => setGoals(results.data))
      .catch(err => console.log(err));

  }, [])


  const [addingEvent, setAddEvent] = useState(false);
  const [addingGoal, setAddGoal] = useState(false);

  const handlePlusClick = (e) => {
    e.preventDefault();
    console.log(e.target.value)
    if (e.target.value === 'event') { setAddEvent(true); }
    else if (e.target.value === 'goal') { setAddGoal(true); }
  }

  const handleCancelClick = (e) => {
    e.preventDefault();
    if (e.target.value === 'event') setAddEvent(false);
    else if (e.target.value === 'goal') setAddGoal(false);
  }

  const [newEvent, setNewEvent] = useState({ name: '', event_date: '', event_time: '' });
  const [newGoal, setNewGoal] = useState({ name: '' });

  const handleNewEvent = (e) => {
    e.preventDefault();
    console.log(newEvent)
    if (newEvent.name === '' || newEvent.event_date === '' || newEvent.event_time === '') return;
    axios.post('/api/chatroom/events', { name: newEvent.title, user_id: props.user, room_id: props.room, event_date: newEvent.date, event_time: newEvent.time })
      .then(results => console.log(results))
      .catch(err => console.log(err))
    setEvents([...events, newEvent]);
    setAddEvent(false);
    setNewEvent({ name: '', event_date: '', event_time: '' });
  }

  const handleNewGoal = (e) => {
    e.preventDefault();
    if (newGoal.name === '') return;
    axios.post('/api/chatroom/goals', { room_id: props.room, info: { name: newGoal.name, user_id: props.user } })
      .then(results => console.log(results))
      .catch(err => console.log(err))
    setGoals([...goals, newGoal])
    setAddGoal(false);
    setNewGoal({ name: '' });
  }

  return (
    <div style={leftDrawerSx}>

      <div style={sectionSx}>

        <div>
          <span style={titleSx}>Events</span>
          {addingEvent === false ?
            <button value='event' onClick={handlePlusClick}>+</button> :
            <button value='event' onClick={handleCancelClick}>x</button>}
        </div>

        <div style={listSx}>
          {events.map((event, i) => <SingleEvent content={event} key={i} />)}
          {addingEvent ?
            <div>
              <form onSubmit={handleNewEvent}>
                <input
                  type='text' placeholder='Event Name'
                  value={newEvent.name}
                  onChange={e => setNewEvent({ name: e.target.value, event_date: newEvent.event_date, event_time: newEvent.event_time })}>
                </input>
                <input
                  type='date' placeholder='Date'
                  value={newEvent.event_date}
                  onChange={e => setNewEvent({ name: newEvent.name, event_date: e.target.value, event_time: newEvent.event_time })}>
                </input>
                <input
                  type='time' placeholder='Time'
                  value={newEvent.event_time}
                  onChange={e => setNewEvent({ name: newEvent.name, event_date: newEvent.event_date, event_time: e.target.value })}>
                </input>
                <button>Create</button>
              </form>
            </div> : null}
        </div>

      </div>

      <div style={sectionSx}>

        <div>
          <span style={titleSx}>Goals</span>
          {addingGoal === false ?
            <button value='goal' onClick={handlePlusClick}>+</button> :
            <button value='goal' onClick={handleCancelClick}>x</button>}
        </div>

        <div style={listSx}>
          {goals.map((goal, i) => <SingleGoal content={goal} key={i} />)}
          {addingGoal ?
            <div>
              <form onSubmit={handleNewGoal}>
                <input
                  type='text' placeholder='Goal'
                  value={newGoal.name}
                  onChange={e => setNewGoal({ name: e.target.value })}>
                </input>
                <button>Create</button>
              </form>
            </div> : null}
        </div>

      </div>

      <div>
        <h3>Memes</h3>
      </div>
    </div >
  )
}

export default LeftDrawer;