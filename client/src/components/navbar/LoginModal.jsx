import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

let LoginModal = (props) => {
  // Modal hooks
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  return (
    <div>
      <Button
        className="login-button"
        size="medium"
        color="inherit"
        sx={{ mr: 2, ml: 4 }}
        onClick={handleOpen}
      >
        Log in
      </Button>

      <Modal open={open} onClose={handleClose} >
        <div style={modalStyle}>
          <div>
            hello
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default LoginModal;