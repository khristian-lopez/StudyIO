import React, {useState, useEffect} from 'react';
import {Button, Grid, Stack} from '@mui/material';

const RoomsList = () => {
    const roomData = [{id: 1, name: 'math'}, {id: 2, name: 'science'}, {id: 3, name: 'english'}]
    const [rooms, getRooms] = useState(roomData)

    if (rooms.length) {
        return (
            <div className="RoomsList" >
                {rooms.map(room => (
                    <Stack key={room.id} sx={style} direction="row" spacing={5}>
                        <div>Room {room.id} {room.name}</div>
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
    padding: "10px",
    alignItems: "center",
    justifyContent: "space-between"
}
