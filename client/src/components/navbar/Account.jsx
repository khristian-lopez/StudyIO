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
  paddingTop: '28px'
}

let roomListSx = {
  marginLeft: '16px',
}

let signOutSx = {
  float: 'left',
  border: '1px solid black',
  width: '84px',
  height: '36px',
  borderRadius: '4px',
  background: 'white',
  cursor: 'pointer',
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
    axios.get('/api/navbar/activeRooms').then(results => {
      setYourRooms(results.data);
    });
    axios.get('/api/navbar/archivedRooms').then(results => {
      setArchivedRooms(results.data);
    });
  }, [])

  const handleArchive = (room) => {
    axios.put('/api/navbar/archive', { roomId: room.roomId }).then(results => {
      console.log(results.data)
    })
    // remove from your rooms and add to archived rooms
    setArchivedRooms([...archivedRooms, room])
    setYourRooms(yourRooms.filter(singleRoom => singleRoom.roomId !== room.roomId))
  };

  const handleReactivate = (room) => {
    axios.put('/api/navbar/archive', { roomId: room.roomId }).then(results => {
      console.log(results.data)
    })
    // remove from archived rooms and add to your rooms
    setYourRooms([...yourRooms, room])
    setArchivedRooms(archivedRooms.filter(singleRoom => singleRoom.roomId !== room.roomId))
  };

  const handleSignOut = (e) => {
    // may need to pass down sign out function from app level or use context
    console.log('signed out')
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

      <Drawer anchor={'right'} open={drawerStatus} onClose={toggleDrawer(false)}>
        <div className="account-drawer" style={drawerSx}>
          <h2>Your rooms</h2>
          <div className="rooms-list" style={roomListSx}>
            {yourRooms.map((room, i) => <Room room={room} active={true} key={i} archive={handleArchive} />)}
          </div>
          <h2>Archived rooms</h2>
          <div className="rooms-list" style={roomListSx}>
            {archivedRooms.map((room, i) => <Room room={room} active={false} key={i} reactivate={handleReactivate} />)}
          </div>
          <button style={signOutSx} onClick={handleSignOut}>Sign out</button>
        </div>
        <Logout
          style={signOutSx}
          userId={props.userId}
          setUserId={props.setUserId}
          userName={props.userName}
          setUserName={props.setUserName}
          login={props.login}
          setLogin={props.setLogin}/>
      </Drawer>
    </div>
  )
}

export default Account;