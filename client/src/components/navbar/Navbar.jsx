import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Account from './Account.jsx';
import LoginModal from './LoginModal.jsx';
import IconButton from '@mui/material/IconButton';

let navSx = {
  color: 'white',
  width: '100%',
  height: '56px',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  background: '#4285F4',
  // background: '#888b8e',
  display: 'flex',
  // mb: '20px',
  justifyContent: 'space-between',
  alignItems: 'center',
  zIndex: 1201,
}


let Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const handleHomeClick = (e) => {
    navigate('/')
  }

  return (
    <div style={navSx}>
      <IconButton
        className="home-button"
        size="medium"
        color="inherit"
        sx={{ mr: 2, ml: 4 }}
        onClick={handleHomeClick}
      >
        StudyIO
      </IconButton>

      {user !== null ? <Account user={user} setUser={setUser} /> : <LoginModal user={user} setUser={setUser} />}

    </div>
  )
}

export default Navbar;