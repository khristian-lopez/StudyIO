import React, { useState, useEffect } from 'react';
import { Avatar, Button, Stack } from '@mui/material';
import Chatroom from '../../chatroom/Chatroom.jsx';
import axios from 'axios';

const RoomsList = ({ topicId, search }) => {

    const [rooms, setRooms] = useState([])

    useEffect(() => {
        if (topicId) {
            axios.get(`/api/rooms/topic/${topicId}/rooms`)
                .then(result => {
                    setRooms(result.data)
                })
                .catch(err => console.log(err))
        } else {
            axios.get(`/api/rooms/name/${search}`)
                .then(result => {
                    setRooms(result.data)
                })
                .catch(err => console.log(err))
        }
    }, [])

    let handleJoin = (e) => {

    }

    if (rooms.length) {
        return (
            <div className="RoomsList" >
                {rooms.map(room => (
                    <Stack key={room.id} sx={style} direction="row" spacing={5}>
                        <div>Room {room.id} {room.name}</div>
                        {room.thumbnail ? <Avatar src={room.thumbnail} style={imageStyle} /> : <div></div>}
                        <div>
                            <Button
                                size="small"
                                variant="outlined"
                                key={room.id}
                                onClick={()=>{window.location.href = window.location.origin + `/chatroom?room=${room.id}`}}
                            >
                                Join
                            </Button>
                        </div>
                    </Stack>
                ))}
            </div>
        )
    } else {
        return (
            <div>
                No Rooms Available
            </div>
        )
    }
}

export default RoomsList;

const style = {
    padding: "5px",
    alignItems: "center",
    justifyContent: "space-between"
}

const imageStyle = {
    margin: "5px",
    width: "50px",
    height: "50px",
    borderRadius: "50%"
}