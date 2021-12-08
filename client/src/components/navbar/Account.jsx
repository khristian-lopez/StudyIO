import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';

let Account = (props) => {

  // drawer hooks
  const [right, setState] = React.useState(false);
  const toggleDrawer = (open) => (event) => {
    setState(open);
  };

  let drawerSx = {
    minWidth: '350px',
    paddingLeft: '48px',
    paddingRight: '48px',
    paddingTop: '28px'
  }

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

      <Drawer anchor={'right'} open={right} onClose={toggleDrawer(false)}>
        <div style={drawerSx}>
          <div>
            Your rooms
          </div>
          <div>
            Your archived rooms
          </div>
        </div>
      </Drawer>
    </div>
  )
}

export default Account;