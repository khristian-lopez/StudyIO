import React, {useState} from 'react';
import {Box, Button, Grid, Modal, Typography} from '@mui/material';
import RoomsList from './RoomsList.jsx';
import RoomForm from './RoomForm.jsx';
// import axios from 'axios';

const TopicsModal = ({openModal, topicId, search, handleClose}) => {
    const [form, showForm] = useState(false);
    // const [rooms, setRooms] = useState([]);

    const closeForm = () => {
        showForm(false)
        handleClose()
    }

    const openForm = (e) => {
        e.preventDefault()
        showForm(true)
    }

    // const getTopicRooms = () => {
    //     axios.get(`/rooms/${id}`)
    //         .then(result => {
    //             setRooms(result.data)
    //         })
    //         .catch(err => console.log(err))
    // }

    if (form) {
        return (
            <div>
                <Modal
                    open={openModal}
                    onClose={closeForm}
                    aria-labelledby="modal-form-title"
                    aria-describedby="modal-form-description"
                >
                    <Box sx={boxStyle} >
                        <RoomForm />
                    </Box>
                </Modal>
            </div>
        )
    } else {
        return (
            <div>
                    <Modal
                        open={openModal}
                        onClose={handleClose}
                        aria-labelledby="modal-title"
                        aria-describedby="modal-description"
                    >
                        <Box container sx={boxStyle} >
                            <Grid container direction="column" sx={gridStyle} >
                                <Typography
                                    id="modal-title"
                                    variant="h6"
                                    component="h2"
                                >
                                    Room {topicId ? topicId : search}
                                </Typography>
                                <Grid sx={innerGrid}>
                                <RoomsList topicId={topicId} name={search}/>
                                </Grid>
                                <Typography
                                    id="modal-description"
                                    sx={{ mt: 10 }}
                                >
                                    Create new study room
                                </Typography>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    onClick={e => openForm(e)}
                                >
                                    Create Room
                                </Button>
                            </Grid>
                        </Box>
                    </Modal>
            </div>
        )
    }
}

export default TopicsModal;

const boxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate( -50%, -50%)",
    margin: "auto",
    padding: "5px",
    width: 400,
    height: 630,
    border: "1px solid #000",
    backgroundColor: "white",
    gap: 4,
    spacing: "15px"
}

const gridStyle = {
    gap: 2,
    padding: "10px",
    alignItems: "center"
}

const innerGrid = {
    border: "1px solid #000",
    margin: "auto",
    padding: "10px",
}