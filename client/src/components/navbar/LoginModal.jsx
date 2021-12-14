import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Login from './Login.jsx';
import SignupModal from './SignupModal.jsx';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 500,
  backgroundColor: 'white',
  borderRadius: '4px',
  boxShadow: 24,
  padding: '24px'
};

const LoginSx = {
  // border: '1px solid black',
  border: 'none',
  // borderRadius: '4px',
  // background: '#ffbd33',
  // background: 'white',
  background: 'transparent',
  height: '36px',
  width: '100px',
  marginRight: '36px',
  // color: '#333',
  color: 'white',
  fontFamily: 'sans-serif',
  fontSize: '20px',
}

const inputContainerSx = {
  // marginBottom: '8px',
}

const inputSx = {
  height: '48px',
  width: '360px',
  marginTop: '12px',
  borderRadius: '6px',
  border: '1px solid #888b8e',
  color: '#333',
  paddingLeft: '16px',
  fontFamily: 'sans-serif',
}

const loginButtonSx = {
  height: '32px',
  width: '120px',
  marginTop: '12px',
  borderRadius: '6px',
  // border: '1px solid #888b8e',
  border: '1px solid #4285F4',
  color: 'white',
  // paddingLeft: '16px',
  fontFamily: 'sans-serif',
  background: '#4285F4',
}



let LoginModal = (props) => {
  // Modal hooks
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // (some function thats probably passed down)
    setEmail('');
    setPassword('');
    console.log('handleLogin')
  }

  const responseGoogle = (response) => {
    console.log(response);
  }

  return (
    <div>
      <button
        // className="login-button"
        style={LoginSx}
        onClick={handleOpen}
      >
        Log in
      </button>

      <Modal open={open} onClose={handleClose} >
        <div style={modalStyle}>
          <h3>Log in</h3>
          <form onSubmit={handleLogin}>
            <div style={inputContainerSx}>
              <input style={inputSx} placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}></input>
            </div>
            <div style={inputContainerSx}>
              <input style={inputSx} placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)}></input>
            </div>
            <button style={loginButtonSx}>Log in</button>
          </form>
          <SignupModal />
          <br />
          <br />
          <Login
            userId={props.userId}
            setUserId={props.setUserId}
            userName={props.userName}
            setUserName={props.setUserName}
            login={props.login}
            setLogin={props.setLogin}/>
        </div>
      </Modal>
    </div>
  )
}

export default LoginModal;