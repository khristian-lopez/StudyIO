import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Account from './Account.jsx';
import LoginModal from './LoginModal.jsx';
import IconButton from '@mui/material/IconButton';


let Navbar = (props) => {

  let navSx = {
    color: 'white',
    width: '100%',
    height: '56px',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    background: '#4285F4',
    display: 'flex',
    mb: '20px',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

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

      {props.user !== 'not logge in' ? <Account user={props.user} /> : <LoginModal />}

    </div>
  )
}

export default Navbar;