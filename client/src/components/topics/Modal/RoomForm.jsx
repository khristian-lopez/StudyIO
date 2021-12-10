import React, {useEffect, useState} from 'react';
import {Button, Grid, TextField, ToggleButton, ToggleButtonGroup, styled} from '@mui/material';
import {Avatar, Typography} from '@mui/material';
import axios from 'axios';

const RoomForm = () => {
    const [inputs, setInputs] = useState({ name: "", count: "", setting: "" });
    const [nameError, setNameError] = useState(false);
    const [countError, setCountError] = useState(false);
    const [image, setImage] = useState("");

    const handleInputChange = e => {
        const {name, value} = e.target;
        setInputs(inputs => ({...inputs, [name]: value}));
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
            let count = Number(inputs.count)
            const data = {
                name: inputs.name,
                max_users: count,
                is_private: setting,
                thumbnail: image
            }
            console.log(data)
            // axios.post('/', data)
            //     .then((result) => {
            //         console.log(result.data)
            //     })
            //     .catch(err => {
            //         console.log(err.response)
            //     })
        }
    }
    // TODO: once user creates room, redirect them to newly created room ** onClick={e => addRoom(e)}
    return (
        <div className="RoomForm">
            <Grid container direction="column" sx={gridStyle}>
                <Typography
                    id="form-title"
                    variant="h5"
                    components="h3"
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
                components="h5"
                >
                    Room Setting
                </Typography>
                <ToggleButtonGroup
                    size="small"
                    exclusive 
                    onChange={handleInputChange} 
                    value={inputs.setting}
                >
                    <ToggleButton 
                        label="Public" 
                        name="setting" 
                        value="public" 
                        color="primary"
                    >
                        Public
                    </ToggleButton>
                    <ToggleButton 
                        label="Private" 
                        name="setting" 
                        value="private"
                        color="primary" 
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
                        color="secondary"
                        size="small"
                        component="span"
                    >
                        Add Thumbnail
                    </Button>
                        <br></br>
                </label>
                { image ? <div>
                    <Avatar src={image} style={imageStyle} alt=''/>
                </div> : <div style={{ marginBottom: "50px", marginTop: "50px"}}></div> }   
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="large"
                    style={{ marginTop: "55px" }}
                    onClick={(e) => {
                        addRoom(e)
                    }}
                >
                    Create Room
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
    margin: "5px",
    borderRadius: "50%"
}

const inputStyle = {
    width: "270px",
    margin: "5px",
    padding: "5px"
}
