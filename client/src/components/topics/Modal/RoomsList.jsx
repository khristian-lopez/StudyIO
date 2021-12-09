import React, {useState, useEffect} from 'react';
import {Button, Grid, Stack} from '@mui/material';
import Chatroom from '../../chatroom/Chatroom.jsx';
import axios from 'axios';

const RoomsList = () => {
    const roomData = [
        {id: 1, name: 'math', image: "https://www.suicideinfo.ca/wp-content/uploads/2016/07/Small-Talk-Logo.png" }, 
        {id: 2, name: 'science', image: "https://www.pinclipart.com/picdir/middle/167-1677865_facebook-button-image-facebook-small-icon-png-clipart.png" }, 
        {id: 3, name: 'english', image: "https://www.vhv.rs/dpng/d/497-4977652_facebook-icon-small-twitter-icon-small-logo-twitter.png" }
    ]
    const [rooms, getRooms] = useState(roomData)

    // useEffect(() => {
    //     axios.get('/')
    //         .then(result => {
    //             getRooms(result.data)
    //         })
    //         .catch(err => console.log(err))
    // })

    if (rooms.length) {
        return (
            <div className="RoomsList" >
                {rooms.map(room => (
                    <Stack key={room.id} sx={style} direction="row" spacing={5}>
                        <div>Room {room.id} {room.name}</div>
                        {room.image ? <img src={room.image} style={imageStyle}/> : <div></div>}
                        <div>
                            <Button
                                size="small"
                                variant="outlined"
                                key={room.id}
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