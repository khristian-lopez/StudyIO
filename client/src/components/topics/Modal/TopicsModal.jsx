import React, {useState} from 'react';
import {Box, Button, Grid, Modal, Typography} from '@mui/material';
import TopicCard from '../componets/topicCard.jsx';
import RoomsList from './RoomsList.jsx';
import RoomForm from './RoomForm.jsx';
import axios from 'axios';

const TopicsModal = ({openModal, id, handleClose}) => {
    const [form, showForm] = useState(false);

    const closeForm = () => {
        showForm(false)
        handleClose()
    }

    const openForm = (e) => {
        e.preventDefault()
        showForm(true)
    }

    // const getRoomId = () => {
    //     axios.get('/rooms')
    //         .then(result => {
    //             setId(result.data)
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
                                    Rooms {id}
                                </Typography>
                                <Grid sx={innerGrid}>
                                <RoomsList id={id}/>
                                </Grid>
                                <Typography 
                                    id="modal-description"
                                    sx={{ mt: 2 }}
                                >
                                    Create new study room
                                </Typography>
                                <Button
                                    variant="outlined"
                                    size="small"
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
    margin: "auto",
    padding: "10px",
    top: "25%",
    left: "25%",
    width: 500,
    border: "1px solid #000",
    backgroundColor: "white",
}

const gridStyle = {
    gap: 1, 
    padding: "10px",
    alignItems: "center"
}

const innerGrid = {
    border: "1px solid #000",
    margin: "auto",
    padding: "10px",
}