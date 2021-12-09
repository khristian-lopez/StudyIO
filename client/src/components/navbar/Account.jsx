import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Room from './Room.jsx';


// add crown next rooms where you are an admin
// needs room ids
let roomsMockData = [
  { room: "Biology 1A", roomId: 2 },
  { room: "Chemistry 2", roomId: 5 },
  { room: "OChem 12C", roomId: 3 },
];

let archivedRoomsMockData = [
  { room: "Intro Bio 1A", roomId: 21 },
  { room: "Alchemy 2", roomId: 1 },
  { room: "Addition 101", roomId: 4 },
];

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
  const [drawerStatus, setDrawerStatus] = React.useState(false);
  const toggleDrawer = (open) => (event) => {
    setDrawerStatus(open);
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
            {roomsMockData.map((room, i) => <Room room={room} active={true} key={i} />)}
          </div>
          <h2>Archived rooms</h2>
          <div className="rooms-list" style={roomListSx}>
            {archivedRoomsMockData.map((room, i) => <Room room={room} active={false} key={i} />)}
          </div>
          <button style={signOutSx}>Sign out</button>
        </div>
      </Drawer>
    </div>
  )
}

export default Account;