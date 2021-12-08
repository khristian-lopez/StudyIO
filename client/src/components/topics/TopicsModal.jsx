import React, {useState} from 'react';
import {Box, Button, Modal, Typography} from '@mui/material';
import RoomsList from './RoomsList.jsx';
import RoomForm from './RoomForm.jsx';

const TopicsModal = () => {
    const [open, setOpen] = useState(false);
    const [form, showForm] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const handleFormClose = () => {
        showForm(false)
        handleClose()
    }

    const addRoom = (e) => {
        e.preventDefault()
        showForm(true)
    }
    if (form) {
        return (
            <div>
                 <div onClick={handleOpen} >Card Example</div>
                <Modal
                    open={open}
                    onClose={handleFormClose}
                    aria-labelledby="modal-form-title"
                    aria-describedby="modal-form-description"
                >
                    <Box 
                        sx={boxStyle}  
                    >
                        <RoomForm />
                        <Button
                            onClick={e => addRoom(e)}
                        >
                            Submit
                        </Button>
                    </Box>
                </Modal>
            </div>
        )
    } else {
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
                            <RoomsList />
                            <Typography 
                                id="modal-description"
                                sx={{ mt: 2 }}
                            >
                                Create new study room
                            </Typography>
                            <Button
                                onClick={e => addRoom(e)}
                            >
                                Create Room
                            </Button>
                        </Box>
                    </Modal>
            </div>
        )
    }
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

// return (
//     <div>
//         <div onClick={handleOpen} >Card Example</div>
//             <Modal
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="modal-title"
//                 aria-describedby="modal-description"
//             >
//                 <Box 
//                     sx={boxStyle}  
//                 >
//                     <Typography 
//                         id="modal-title"
//                         variant="h6"
//                         component="h2"
//                     >
//                         Rooms
//                     </Typography>
//                     <RoomsList />
//                     <Typography 
//                         id="modal-description"
//                         sx={{ mt: 2 }}
//                     >
//                         Create new study room
//                     </Typography>
//                     <Button
//                         onClick={e => addRoom(e)}
//                     >
//                         Create Room
//                     </Button>
//                 </Box>
//             </Modal>
//     </div>
// )