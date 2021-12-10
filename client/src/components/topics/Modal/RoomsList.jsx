import React, {useState, useEffect} from 'react';
import {Avatar, Button, Stack} from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import Chatroom from '../../chatroom/Chatroom.jsx';
import axios from 'axios';

const RoomsList = ({id, name}) => {
    // future: set random thumbnails for room if user do not upload one **
    // const roomData = [
    //     {id: 1, name: 'math', thumbnail: "https://www.suicideinfo.ca/wp-content/uploads/2016/07/Small-Talk-Logo.png" },
    //     {id: 2, name: 'science', thumbnail: "https://www.pinclipart.com/picdir/middle/167-1677865_facebook-button-image-facebook-small-icon-png-clipart.png" },
    //     {id: 3, name: 'english', thumbnail: "https://www.vhv.rs/dpng/d/497-4977652_facebook-icon-small-twitter-icon-small-logo-twitter.png" }
    // ]
    const [rooms, getRooms] = useState([])

    useEffect(() => {
       if (id) {
          axios.get(`/api/rooms/topic/${id}`)
            .then(result => {
                getRooms(result.data)
            })
            .catch(err => console.log(err))
       } else {
           axios.get(`/api/rooms/name/${name}`)
            .then(result => {
                getRooms(result.data)
            })
            .catch(err => console.log(err))
       }
    }, [])
    console.log('rooms: ', rooms)
    // TODO: nagivate user to specific room `${id}` after button click
    const navigate = useNavigate();
    const handleRoomClick = () => {
        // based on structure => `/chatroom/room/id`
        navigate('/chatroom')
    };
    
    if (rooms.length) {
        return (
            <div className="RoomsList" >
                {rooms.map(room => (
                    <Stack key={room.id} sx={style} direction="row" spacing={5}>
                        <div>Room {room.id} {room.name}</div>
                        {room.thumbnail ? <Avatar src={room.thumbnail} style={imageStyle}/> : <div></div>}
                        <div>
                            <Button
                                size="small"
                                variant="outlined"
                                key={room.id}
                                onClick={handleRoomClick}
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