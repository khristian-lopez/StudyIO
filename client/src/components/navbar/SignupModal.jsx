import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

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
const inputContainerSx = {
  // marginBottom: '8px',
}

const signupButtonSx = {
  height: '32px',
  width: '120px',
  marginTop: '12px',
  borderRadius: '6px',
  border: '1px solid #808080',
  color: 'white',
  fontFamily: 'sans-serif',
  background: '#808080',
}

const submitButtonSx = {
  height: '32px',
  width: '120px',
  marginTop: '12px',
  borderRadius: '6px',
  border: '1px solid #4285F4',
  color: 'white',
  fontFamily: 'sans-serif',
  background: '#4285F4',
}

const closeButtonSx = {
  height: '32px',
  width: '120px',
  marginTop: '12px',
  borderRadius: '6px',
  border: '1px solid #808080',
  color: 'white',
  fontFamily: 'sans-serif',
  background: '#808080',
}

function SignupModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]  = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    // (some function thats probably passed down)
    setEmail('');
    setPassword('');
    console.log('handleLogin')
  }

  return (
    <React.Fragment>
      {/* <Button onClick={handleOpen}>Sign up</Button> */}
      <button onClick={handleOpen} style={signupButtonSx}>Sign up</button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...modalStyle, width: 400 }}>
          <h3>Sign up</h3>
          <form onSubmit={handleSignup}>
            <div style={inputContainerSx}>
              <input style={inputSx} placeholder="Enter first name" value={password} onChange={e => setPassword(e.target.value)}></input>
            </div>
            <div style={inputContainerSx}>
              <input style={inputSx} placeholder="Enter last name" value={password} onChange={e => setPassword(e.target.value)}></input>
            </div>
            <div style={inputContainerSx}>
              <input style={inputSx} placeholder="Enter email" value={email} onChange={e => setFirstName(e.target.value)}></input>
            </div>
            <div style={inputContainerSx}>
              <input style={inputSx} placeholder="Enter password" value={password} onChange={e => setLastName(e.target.value)}></input>
            </div>
            <button style={submitButtonSx}>Submit</button>
          </form>
          {/* <Button onClick={handleClose}>Close Child Modal</Button> */}
          <br />
          <button style={closeButtonSx} onClick={handleClose}>Close</button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default SignupModal;