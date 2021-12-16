import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';

const EditEvent = (props) => {
    const [event, setEvent] = useState(props.currentEvent)

    useEffect(() => {
        setEvent(props.currentEvent)
    }, [props])

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEvent({ ...event, [name]: value })
    }

    const updateDatabaseEvent = (id, event) => {
        const date = new Date(event.event_date)
        axios.put(`/api/chatroom/events/${id}/update`, { name: event.name, event_date: date, event_time: event.event_time})
            .then(() => {
                console.log('Success')
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <h3>Edit Event</h3>
            <Box>
                <TextField
                    variant="standard"
                    name="name"
                    onChange={handleInputChange}
                    value={event.name}
                />
                    <br></br>
                <TextField
                    variant="standard"
                    name="event_date"
                    onChange={handleInputChange}
                    value={event.event_date}
                />
                    <br></br>
                <TextField
                    variant="standard"
                    name="event_time"
                    onChange={handleInputChange}
                    value={event.event_time}
                />
                    <br></br>
                <Button
                variant="contained"
                size="small"
                onClick={e => {
                    e.preventDefault()
                    props.updateEvent(event.id, event)
                    updateDatabaseEvent(event.id, event)
                }}>
                    Save
                </Button>
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                        props.setEditEvent(false)
                    }}>
                        Cancel
                </Button>
            </Box>
        </div>
    )
}

export default EditEvent;
