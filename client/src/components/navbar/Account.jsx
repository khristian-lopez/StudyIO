import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Room from './Room.jsx';
import Logout from './Logout.jsx';

// add crown next rooms where you are an admin
// needs room ids

let drawerSx = {
  minWidth: '350px',
  paddingLeft: '48px',
  paddingRight: '48px',
  paddingTop: '28px',
}

let roomListSx = {
  marginLeft: '16px',
  marginBottom: '24px',
}

let signOutSx = {
  float: 'left',
  border: '1px solid',
  width: '84px',
  height: '36px',
  borderRadius: '4px',
  background: 'white',
  cursor: 'pointer',
  backgroundColor: '#FAA307',
  color:'white',
}


let Account = (props) => {
  // drawer hooks
  const [drawerStatus, setDrawerStatus] = useState(false);
  const toggleDrawer = (open) => (event) => {
    setDrawerStatus(open);
  };

  const [yourRooms, setYourRooms] = useState([]);
  const [archivedRooms, setArchivedRooms] = useState([]);

  useEffect(() => {
    axios.get('/api/navbar/rooms', { params: { user_id: props.userId } }).then(results => {
      setYourRooms(results.data.active);
      setArchivedRooms(results.data.archived);
    });
  }, [])

  const handleArchive = (room) => {
    axios.put('/api/navbar/archive', { room_id: room.id }).then(results => {
      console.log(results.data)
    })
    // remove from your rooms and add to archived rooms
    setArchivedRooms([...archivedRooms, room])
    setYourRooms(yourRooms.filter(singleRoom => singleRoom.id !== room.id))
  };

  const handleReactivate = (room) => {
    axios.put('/api/navbar/reactivate', { room_id: room.id }).then(results => {
      console.log(results.data)
    })
    // remove from archived rooms and add to your rooms
    setYourRooms([...yourRooms, room])
    setArchivedRooms(archivedRooms.filter(singleRoom => singleRoom.id !== room.id))
  };

  return (
    <div>
      <IconButton
        className="home-button"
        size="medium"
        color="inherit"
        sx={{ mr: 2, ml: 4 }}
        onClick={toggleDrawer(true)}
      >
        <AccountCircleIcon style={{ fontSize: 40 }} />
      </IconButton>

      <Drawer anchor={'right'} open={drawerStatus} onClose={toggleDrawer(false)} style={{ zIndex: '1202'}}>
        <div className="account-drawer" style={drawerSx}>
          <h2>Your rooms</h2>
          <div className="rooms-list" style={roomListSx}>
            {yourRooms.map((room, i) => <Room room={room} active={true} key={i} archive={handleArchive} />)}
          </div>
          <h2>Archived rooms</h2>
          <div className="rooms-list" style={roomListSx}>
            {archivedRooms.map((room, i) => <Room room={room} active={false} key={i} reactivate={handleReactivate} />)}
          </div>
          <Logout
            style={signOutSx}
            userId={props.userId}
            setUserId={props.setUserId}
            userName={props.userName}
            setUserName={props.setUserName}
            login={props.login}
            setLogin={props.setLogin}
            roomId={props.roomId} />
        </div>
      </Drawer>
    </div>
  )
}

export default Account;