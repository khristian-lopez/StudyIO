import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField, ToggleButton, ToggleButtonGroup, styled } from '@mui/material';
import { Avatar, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const RoomForm = ({ user, topicId }) => {
    const [inputs, setInputs] = useState({ id: topicId, name: "", count: "", setting: "" });
    const [nameError, setNameError] = useState(false);
    const [countError, setCountError] = useState(false);
    const [image, setImage] = useState("");

    const handleInputChange = e => {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    const handleImageChange = e => {
        let url = URL.createObjectURL(e.target.files[0]);
        setImage(url);
    }

    const validate = () => {
        setNameError(false);
        setCountError(false);
        let isValid = true;
        if (inputs.name === "") {
            setNameError(true)
            isValid = false;
        }
        if (inputs.count === "" || inputs.count.match(/^[0-9]*$/) === null) {
            setCountError(true)
            isValid = false;
        }
        return isValid;
    }

    const addRoom = e => {
        e.preventDefault();
        if (validate()) {
            let setting;
            if (inputs.setting === "public") {
                setting = false;
            } else {
                setting = true;
            }

            let count = Number(inputs.count);
            const data = {
                name: inputs.name,
                thumbnail: image,
                max_users: count,
                is_private: setting,
                admin_id: user
            }
            axios.post(`/api/rooms/${topicId}/create`, data)
                .then((result) => {
                    joinRoom(result.data.room_id)
                })
                .catch(err => {
                    console.log(err.response)
                })
        }
    }

    const joinRoom = (id) => window.location.href = window.location.origin + `/chatroom?room=${id}`;

    return (
        <div className="RoomForm">
            <Grid container direction="column" sx={gridStyle}>
                <Typography
                    id="form-title"
                    variant="h5"
                    components="h4"
                >
                    Create a Room
                </Typography>
                <TextField sx={inputStyle}
                    label="Room name"
                    variant="standard"
                    name="name"
                    size="small"
                    value={inputs.name}
                    onChange={handleInputChange}
                    required
                    error={nameError}
                    helperText={nameError && "Must have a name!"}
                />
                <TextField sx={inputStyle}
                    label="# of members"
                    variant="standard"
                    name="count"
                    size="small"
                    value={inputs.count}
                    onChange={handleInputChange}
                    required
                    error={countError}
                    helperText={countError && "Must be a number!"}
                />
                <Typography
                    id="toggle-button-form"
                    variant="h8"
                    components="h6"
                >
                    Room Setting
                </Typography>
                <ToggleButtonGroup
                    size="medium"
                    exclusive
                    onChange={handleInputChange}
                    value={inputs.setting}
                    sx={{ backgroundColor: "#f0c44f" }}
                >
                    <ToggleButton
                        label="Public"
                        name="setting"
                        value="public"
                        sx={{ color: "white", backgroundColor: "#f0c44f" }}
                    >
                        Public
                    </ToggleButton>
                    <ToggleButton
                        label="Private"
                        name="setting"
                        value="private"
                        sx={{ color: "white", backgroundColor: "#f0c44f" }}
                    >
                        Private
                    </ToggleButton>
                </ToggleButtonGroup>
                <label htmlFor="contained-button-file" >
                    <Input
                        id="contained-button-file"
                        type="file"
                        name="image"
                        accept="image/*"
                        label="Upload"
                        onChange={e => handleImageChange(e)}
                    />
                    <Button
                        variant="contained"
                        size="medium"
                        component="span"
                        sx={buttonStyle}
                    >
                        Add Thumbnail
                    </Button>
                    <br></br>
                </label>
                { image ?
                    <div>
                        <Avatar src={image} style={imageStyle} />
                    </div>
                    :
                    <div>
                        <Avatar style={imageStyle} alt='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'/>
                    </div>
                }
                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={buttonStyle}
                    onClick={(e) => {
                        addRoom(e)
                    }}
                >
                    Create Room
                    <AddIcon sx={{ marginLeft: "3px" }} />
                </Button>
            </Grid>
        </div>
    )
}

export default RoomForm;

const Input = styled('input')({
    display: 'none'
})

const gridStyle = {
    position: "absolute",
    justifyContent: "flex-end",
    margin: "7px",
    padding: "7px",
    width: 400,
    alignItems: "center",
    gap: 2,
}

const imageStyle = {
    width: "95px",
    height: "95px",
    marginTop: "10px",
    borderRadius: "50%"
}

const inputStyle = {
    width: "270px",
    margin: "2px",
    padding: "2px"
}

const buttonStyle = {
    marginTop: "20px",
    marginBottom: "10px",
    width: "200px",
    backgroundColor: "#f0c44f"
}