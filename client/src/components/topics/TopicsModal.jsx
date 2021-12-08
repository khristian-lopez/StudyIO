import React, {useState} from 'react';
import {Box, Button, Modal, Typography} from '@mui/material';

const TopicsModal = () => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <div onClick={handleOpen} >Card Example</div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Box 
                        sx={boxStyle}
                        
                    >
                        <Typography 
                            id="modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Rooms
                        </Typography>
                        <Typography 
                            id="modal-description"
                            sx={{ mt: 2 }}
                        >
                            Create new study room
                        </Typography>
                        <Button>
                            Create Room
                        </Button>
                    </Box>
                </Modal>
        </div>
    )
}

export default TopicsModal;

const boxStyle = {
    position: "absolute",
    margin: "auto",
    top: "25%",
    left: "25%",
    width: 500,
    border: "2px solid #000",
    backgroundColor: "white",
}