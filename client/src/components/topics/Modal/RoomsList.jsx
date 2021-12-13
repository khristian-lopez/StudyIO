import React, {useState, useEffect} from 'react';
import {Avatar, Button, CircularProgress} from '@mui/material';
import {Box, Grid, List, ListItem, ListItemText, ListItemAvatar} from '@mui/material';
import axios from 'axios';



const RoomsList = ({ topicId, name }) => {
    const [rooms, setRooms] = useState([])

    // useEffect(() => {
    //     if (topicId) {
    //         axios.get(`/api/rooms/topic/${topicId}/rooms`)
    //             .then(result => {
    //                 setRooms(result.data)
    //             })
    //             .catch(err => console.log(err))
    //     } else {
    //         axios.get(`/api/rooms/name/:${name}`)
    //             .then(result => {
    //                 setRooms(result.data)
    //             })
    //             .catch(err => console.log(err))
    //     }
    // }, [])
    useEffect(() => {
        if (topicId) {
            const timer = setTimeout(() => {
                axios.get(`/api/rooms/topic/${topicId}/rooms`)
                    .then(result => {
                        setRooms(result.data)
                    })
                    .catch(err => console.log(err))
            }, 300)
            return () => clearTimeout(timer)
        } else {
            axios.get(`/api/rooms/name/:${name}`)
                .then(result => {
                    setRooms(result.data)
                })
                .catch(err => console.log(err))
        }
    }, [])

    let handleJoin = (e) => {
        // TODO
    }
    return (
        <Box>
            { rooms.length === 0 ? 
            <Box>
                <Grid container sx={loadStyle}>
                    <CircularProgress/>
                </Grid>
            </Box> :
            <Grid item sx={innerGrid}>
                <List>
                    {rooms.map(room => (
                        <ListItem sx={style} key={room.id} >
                            <ListItemAvatar >
                                {room.thumbnail ? <Avatar src={room.thumbnail} style={imageStyle} />
                                : <Avatar style={imageStyle} alt='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'/>}
                            </ListItemAvatar >
                            <ListItemText>
                                Room {room.id} {room.name}
                            </ListItemText>
                            <Button
                                sx={{ marginLeft: "10px" }}
                                size="small"
                                variant="outlined"
                                key={room.id}
                                onClick={()=>{window.location.href = window.location.origin + `/chatroom?room=${room.id}`}}
                            >
                                Join
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Grid>}
        </Box>
    )
}

export default RoomsList;

const style = {
    alignItems: "center",
    justifyContent: "space-between"
}

const loadStyle = {
    justifyContent: "center",
    border: "1px solid #000",
    margin: "auto",
    padding: "10px",
    height: "325px",
    width: "300px",
    overflowX: "visible"
}

const imageStyle = {
    margin: "5px",
    width: "50px",
    height: "50px",
    borderRadius: "50%"
}

const innerGrid = {
    border: "1px solid #000",
    margin: "auto",
    padding: "10px",
    height: "325px",
    overflowY: "scroll"
}