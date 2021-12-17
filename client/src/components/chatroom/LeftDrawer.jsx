import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SingleEvent from './SingleEvent.jsx';
import SingleGoal from './SingleGoal.jsx';
import EditGoal from './form/EditGoal.jsx';
import EditEvent from './form/EditEvent.jsx';

import Divider from '@mui/material/Divider';
import {List, ListItem, ListItemText, Button, Grid} from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import EditIcon from '@mui/icons-material/Edit';

const leftDrawerSx = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '70px',
  padding: '12px',
}
const titleSection = {
  display: 'flex',
 // flexDirection: 'column',
  justifyContent: 'flex-start',
  // height: '100px',
  width: '200px',
  height: '50px',
  borderRadius: '20px',
  border: '1px solid #f48c06',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#ffb703',
  color: 'white'
}

const iconButton = {
  marginLeft: '10px',
  borderRadius: '50%',
  width: '30px',
  height: '30px'
}

const eventRowSx = {
  display: 'flex',
  flexDirection: 'row',
  alignItems:'space-evenly',
  width: '220px',
  height: '40px',
  justifyContent:'space-evenly',
  border: '1px solid #f48c06',
  borderRadius: '10px',
  backgroundColor: '#ffb703',
  marginTop: '10px',
  marginBottom:'10px',
  padding: '0px',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '16px'
}

const eventRowIcon = {
  marginLeft: '0px',
  minWidth: '0px',
  padding:'0px',
  //backgroundColor:'white'
}
const goalRowIcon = {
  marginLeft: '0px',
  minWidth: '0px',
  padding:'0px',
  //backgroundColor:'white'
}
const goalRowSx = {
  display: 'flex',
  flexDirection: 'row',
  alignItems:'space-evenly',
  width: '220px',
  height: '40px',
  justifyContent:'space-evenly',
  border: '1px solid #f48c06',
  borderRadius: '10px',
  backgroundColor: '#ffb703',
  marginTop: '10px',
  padding: '0px',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '16px'
}
const sectionSx = {
  display: 'flex',
  // alignItems: 'flex-start',
  // justifyContent: 'flex-start',
  flexDirection: 'column',
  marginBottom: '24px',
  backgroundColor: 'white',
  borderLeft: '2px solid #f48c06',
  borderRadius: '20px'
}

const titleSx = {
  fontSize: '20px',
  fontWeight: 'bold',
}

const listSx = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '15px',
  marginTop: '16px',
  backgroundColor:'white',
  //border: '1px solid',
  borderRadius: '20px'

}

const LeftDrawer = (props) => {
  const [events, setEvents] = useState([]);
  const [addingEvent, setAddEvent] = useState(false);
  const [editCurrentEvent, setEditEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({ id: '', name: '', event_date: '', event_time: '' });
  const [currentEvent, setCurrentEvent] = useState({ id: '', name: '', event_date: '', event_time: '' });

  const [goals, setGoals] = useState([]);
  const [addingGoal, setAddGoal] = useState(false);
  const [editCurrentGoal, setEditGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({ id: '', name: '' });
  const [currentGoal, setCurrentGoal] = useState({ id: '', name: '' });

  useEffect(() => {
    axios.get('/api/chatroom/events', { params: { room_id: props.room } })
      .then(results => {
        setEvents(results.data)
      })
      .catch(err => {
        console.log(err)
      });

    axios.get('/api/chatroom/goals', { params: { room_id: props.room } })
      .then(results => {
        setGoals(results.data)
      })
      .catch(err => {
        console.log(err)
      });
  }, [newEvent, newGoal])

  const handlePlusClick = (e) => {
    e.preventDefault();
    if (e.target.value === 'event') { setAddEvent(true); }
    else if (e.target.value === 'goal') { setAddGoal(true); }
  }

  const handleCancelClick = (e) => {
    e.preventDefault();
    if (e.target.value === 'event') setAddEvent(false);
    else if (e.target.value === 'goal') setAddGoal(false);
  }

  const handleNewEvent = (e) => {
    e.preventDefault();

    let user = Number(props.user)
    let date = new Date(newEvent.event_date)

    if (newEvent.name === '' || newEvent.event_date === '' || newEvent.event_time === '') return;
    axios.post('/api/chatroom/events', { name: newEvent.name, user_id: user, room_id: props.room, event_date: date, event_time: newEvent.event_time })
      .then(results => {
        setNewEvent({ id: results.data.event_id, name: newEvent.name, event_date: newEvent.event_date, event_time: newEvent.event_time})
      })
      .then(() => {
        setEvents([...events, newEvent]);
        setAddEvent(false);
        setNewEvent({ id: '', name: '', event_date: '', event_time: '' });
      })
      .catch(err => console.log(err))
  }

  const handleNewGoal = (e) => {
    e.preventDefault();
    if (newGoal.name === '') return;
    axios.post('/api/chatroom/goals', { room_id: props.room, info: { name: newGoal.name, user_id: props.user } })
      .then(results => {
        setNewGoal({id: results.data.goal_id, name: newGoal.name})
      })
      .then(() => {
        setGoals([...goals, newGoal])
        setAddGoal(false);
        setNewGoal({ id: '', name: '' });
      })
      .catch(err => console.log(err))
  }

  // TODO: update & delete events
  const editEvents = (updatedEvent) => {
    setEditEvent(true);
    let newEventDate = updatedEvent.event_date.slice(0, 10)
    setCurrentEvent({ id: updatedEvent.id, name: updatedEvent.name, event_date: newEventDate, event_time: updatedEvent.event_time})
  }

  const updateEvent = (id, updatedEvent) => {
    setEditEvent(false)
    setEvents(events.map(event => (event.id === id ? updatedEvent : event)))
  }

  const deleteEvents = (id, i) => {
    let newEvents = events;
    newEvents.splice(i, 1);
    axios.delete(`/api/chatroom/events/${id}/delete`)
      .then(() => {
        setEvents([...events])
      })
      .catch(err => console.log(err))
  }

  // TODO: delete goals
  const editGoals = (updatedGoal) => {
    setEditGoal(true);
    setCurrentGoal({ id: updatedGoal.id, name: updatedGoal.name })
  }

  const updateGoal = (id, updatedGoal) => {
    setEditGoal(false)
    setGoals(goals.map(goal => (goal.id === id ? updatedGoal : goal)))
  }

  const deleteGoal = (id, i) => {
    let newGoals = goals;
    newGoals.splice(i, 1);
    axios.delete(`/api/chatroom/goals/${id}/delete`)
      .then(() => {
        setGoals([...newGoals])
      })
      .catch(err => console.log('DELETE GOAL: ', err))
  }

  return (
    <div style={leftDrawerSx}>
      <div style={sectionSx}>
        <div style={titleSection}>
          <span style={titleSx}>Events</span>
          {addingEvent === false ?
            <button value='event' onClick={handlePlusClick} style={iconButton}>+</button> :
            <button value='event' onClick={handleCancelClick} style={iconButton}>x</button>}
        </div>
        {addingEvent ?
            <div>
              <form onSubmit={handleNewEvent}>
                <input
                  type='text' placeholder='Event Name' maxLength="25"
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
        <Grid style={listSx}>
          {events.map((event, i) => (
              <ListItem key={i} sx={eventRowSx}>
                <SingleEvent content={event} key={i}/>
                <Button size="small" sx={eventRowIcon}>
                  <EditIcon size="small"
                    onClick={() => {
                      editEvents(event)
                    }}
                  />
                </Button>
                <Button size="small" sx={eventRowIcon}>
                  <RemoveCircleIcon size="small"
                    onClick={() => {
                      deleteEvents(event.id, i)
                    }}
                />
                </Button>
              </ListItem>
          ))}
          { editCurrentEvent ? (
            <EditEvent editCurrentEvent={editCurrentEvent} setEditEvent={setEditEvent} currentEvent={currentEvent} updateEvent={updateEvent}/>
          ) : null }
        </Grid>
      </div>
      <div style={sectionSx}>
        <div style={titleSection}>
          <span style={titleSx}>Goals</span>
          {addingGoal === false ?
            <button value='goal' onClick={handlePlusClick} style={iconButton}>+</button> :
            <button value='goal' onClick={handleCancelClick} style={iconButton}>x</button>}
        </div>
        {addingGoal ?
            <div>
              <form onSubmit={handleNewGoal}>
                <input
                  type='text' placeholder='Goal' maxLength="25"
                  value={newGoal.name}
                  onChange={e => setNewGoal({ name: e.target.value })}>
                </input>
                <button>Create</button>
              </form>
            </div> : null}
        <Grid style={listSx}>
          {goals.map((goal, i) => (
          <ListItem key={i} sx={goalRowSx}>
            <SingleGoal content={goal} key={i} />
            <Button size="small"
             onClick={() => {
               editGoals(goal)
             }}
             sx={goalRowIcon}
            >
              Edit
            </Button>
            <Button size="small"
              onClick={() => {
                deleteGoal(goal.id, i)
              }}
              sx={goalRowIcon}
            >
              Delete
            </Button>
          </ListItem>
          ))}
          { editCurrentGoal ? (
            <EditGoal editCurrentGoal={editCurrentGoal} setEditGoal={setEditGoal} currentGoal={currentGoal} updateGoal={updateGoal} />
          ) : null }
          <br></br>
        </Grid>
      </div>
      {/* <div>
        <h3>Memes</h3>
      </div> */}
    </div >
  )
}

export default LeftDrawer;