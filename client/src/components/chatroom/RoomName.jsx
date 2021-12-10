import React from 'react';
import MeetingRoomTwoToneIcon from '@mui/icons-material/MeetingRoomTwoTone';
import './RoomName.scss';

let RoomName = (props) => {
  return (
    <div id='RoomName'>
      <MeetingRoomTwoToneIcon />
      <div>Room Name</div>
    </div>
  )
}

export default RoomName;