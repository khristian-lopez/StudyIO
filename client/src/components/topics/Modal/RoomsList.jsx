import React, { useState, useEffect } from 'react';
import { Avatar, Button, CircularProgress } from '@mui/material';
import { Box, Grid, List, ListItem, ListItemText, ListItemAvatar } from '@mui/material';
import axios from 'axios';

const RoomsList = ({ topicId, search, user, open, setOpen }) => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userCounts, setUserCounts] = useState([]);

    useEffect(() => {
        if (topicId) {
            const timer = setTimeout(() => {
                axios.get(`/api/rooms/topic/${topicId}`)
                    .then(result => {
                        setRooms(result.data)
                        setLoading(false)
                    })
                    .catch(err => console.log(err))
            }, 300)
            return () => clearTimeout(timer)
        } else {
            axios.get(`/api/rooms/name/${search}`)
                .then(result => {
                    setRooms(result.data)
                    setLoading(false)
                })
                .catch(err => console.log(err))
        }
    }, [])

    useEffect(() => {
        if (rooms.length === 0) { return };

        axios.get(`/server/rooms/users`, {
            params: {
                roomIDs: rooms.map(room => room.id)
            }
        }).then(res => setUserCounts(res.data));
    }, [rooms])

    const joinRoom = (roomId) => {
        if(user) {
            axios.get('/api/chatroom/members', { params: { room_id: roomId} })
            .then(results => results.data.filter(item => item.id === Number(user)))
            .then(check => check.length !== 0 ? window.location.href = window.location.origin + `/chatroom?room=${roomId}` : axios.post('/api/addUserToRoom',{user_id: user, room_id: roomId})
                        .then(window.location.href = window.location.origin + `/chatroom?room=${roomId}`)
                        .catch(err=>console.error(err)))
            .catch(err => console.log(err));
        } else {
            setOpen(true);
        }
    }

    return (
        <Box>
            {loading ?
                <Box>
                    <Grid container sx={loadStyle}>
                        <CircularProgress />
                    </Grid>
                </Box> :
                <Grid item sx={innerGrid}>
                    <List>
                        {rooms.map((room, i) => ( // might need to add room.members.includes(user) to conditional
                            !room.is_private && !room.is_archived ?
                                <div key={room.id}>
                                    <ListItem key={room.id} >
                                        <ListItemAvatar >
                                            {room.thumbnail ? <Avatar src={room.thumbnail} sx={imageStyle} />
                                                : <Avatar style={imageStyle} alt='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png' />}
                                        </ListItemAvatar >
                                        <ListItemText sx={style} >
                                            {room.name}
                                        </ListItemText>
                                        {userCounts[i]}/{room.max_users}
                                        <Button
                                            sx={{ marginLeft: "5px", backgroundColor: "#f0c44f", color: "white" }}
                                            size="medium"
                                            variant="contained"
                                            key={room.id}
                                            onClick={()=>Number(userCounts[i]) < Number(room.max_users) ? joinRoom(room.id) : alert('Room full!')}
                                        >
                                            Join
                                        </Button>
                                    </ListItem>
                                </div> : <div key={room.id}></div>
                        ))}
                    </List>
                </Grid>
            }
        </Box>
    )
}

export default RoomsList;

const style = {
    margin: "10px",
    display: "flex",
    alignItems: "center"
}

const loadStyle = {
    justifyContent: "center",
    border: "1px solid #000",
    margin: "auto",
    padding: "10px",
    height: "350px",
    width: "390px",
    overflowX: "visible",
}

const imageStyle = {
    margin: "5px",
    width: "50px",
    height: "50px",
    borderRadius: "50%"
}

const innerGrid = {
    border: "1px solid #000",
    height: "350px",
    width: "390px",
    overflowY: "scroll",
}