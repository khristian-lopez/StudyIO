import React, {useState} from 'react';
import {Box, Button, Grid, Modal, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RoomsList from './RoomsList.jsx';
import RoomForm from './RoomForm.jsx';
// import axios from 'axios';

const TopicsModal = ({openModal, topicId, search, handleClose, user}) => {
    const [form, showForm] = useState(false);

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
                        <RoomForm user={user} topicId={topicId}/>
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
                                    variant="h5"
                                    component="h2"
                                >
                                    Room {topicId ? topicId : search}
                                </Typography>
                                <Grid sx={innerGrid}>
                                <RoomsList topicId={topicId} name={search}/>
                                </Grid>
                                {topicId ? <><Typography
                                    id="modal-description"
                                    variant="h6"
                                    component="h2"
                                    sx={{ mt: 10, position: "absolute", bottom: 120 }}
                                >
                                    Create a new study room?
                                </Typography>
                                <Button sx={{ width: "200px", position: "absolute", bottom: 65 }}
                                    variant="contained"
                                    size="large"
                                    onClick={e => openForm(e)}
                                >
                                    Create Room
                                    <AddIcon sx={{ marginLeft: "3px" }}/>
                                </Button></> : <div />}
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
    gap: "20px",
    spacing: 20
}

const gridStyle = {
    gap: "20px",
    alignItems: "center"
}

const innerGrid = {
    border: "1px solid #000",
    margin: "auto",
    padding: "10px",
}