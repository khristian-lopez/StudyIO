import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SingleEventOrGoal from './SingleEventOrGoal.jsx';

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

const mockEvents = [
  { title: 'Midterm', date: '12/6', time: '8:00 PM' },
  { title: 'Final', date: '12/17', time: '7:30 AM' },
  { title: 'Final Project', date: '12/19', time: '9:00 AM' },
]

const mockGoals = [
  { title: 'At least 90% on Final' },
  { title: 'Complete first half of project by 12/6' },
  { title: 'Drink more water and exercise' },
]

// query for events and goals here then map into individual components

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

  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '' });
  const [newGoal, setNewGoal] = useState({ title: '' });

  const handleNewEvent = (e) => {
    e.preventDefault();
    console.log(newEvent)
    if (newEvent.title === '' || newEvent.date === '' || newEvent.time === '') return;
    // Need to add to DB still
    axios.post('/api/chatroom/events',)
      .then(results => console.log(results))
      .catch(err => console.log(err))
    setEvents([...events, newEvent]);
    setAddEvent(false);
    setNewEvent({ title: '', date: '', time: '' });
  }

  const handleNewGoal = (e) => {
    e.preventDefault();
    if (newGoal.title === '') return;
    // need to add to db still
    axios.post('/api/chatroom/events',)
      .then(results => console.log(results))
      .catch(err => console.log(err))
    setGoals([...goals, newGoal])
    setAddGoal(false);
    setNewGoal({});
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
          {events.map((event, i) => <SingleEventOrGoal content={event} key={i} />)}
          {addingEvent ?
            <div>
              <form onSubmit={handleNewEvent}>
                <input
                  type='text' placeholder='Event Name'
                  value={newEvent.title}
                  onChange={e => setNewEvent({ title: e.target.value, date: newEvent.date, time: newEvent.time })}>
                </input>
                <input
                  type='date' placeholder='Date'
                  value={newEvent.date}
                  onChange={e => setNewEvent({ title: newEvent.title, date: e.target.value, time: newEvent.time })}>
                </input>
                <input
                  type='time' placeholder='Time'
                  value={newEvent.time}
                  onChange={e => setNewEvent({ title: newEvent.title, date: newEvent.date, time: e.target.value })}>
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
          {goals.map((goal, i) => <SingleEventOrGoal content={goal} key={i} />)}
          {addingGoal ?
            <div>
              <form onSubmit={handleNewGoal}>
                <input
                  type='text' placeholder='Goal'
                  value={newGoal.title}
                  onChange={e => setNewGoal({ title: e.target.value })}>
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