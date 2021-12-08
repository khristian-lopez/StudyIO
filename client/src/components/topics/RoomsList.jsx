import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';

const RoomsList = () => {
    const roomData = [{id: 1, name: 'math'}, {id: 2, name: 'science'}, {id: 3, name: 'english'}]
    const [rooms, getRooms] = useState(roomData)
    if (rooms.length) {
        return (
            <div className="RoomsList" >
                {rooms.map(room => {
                    return <div key={room.id}>Room {room.id} {room.name}
                            <Button
                                size="small"
                                variant="outlined"
                                key={room.id}
                            >
                             Join
                            </Button>
                           </div>
                })}
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