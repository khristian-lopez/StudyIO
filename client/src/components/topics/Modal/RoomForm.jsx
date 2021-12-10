import React, {useState} from 'react';
import {Button, Grid, TextField, ToggleButton, ToggleButtonGroup, styled} from '@mui/material';
import {Typography} from '@mui/material';
import axios from 'axios';

const RoomForm = () => {
    const [inputs, setInputs] = useState({ name: "", count: "", setting: "" });
    const [image, setImage] = useState("");

    const handleInputChange = e => {
        const {name, value} = e.target;
        setInputs(inputs => ({...inputs, [name]: value}));
    }

    const handleImageChange = e => {
        let url = URL.createObjectURL(e.target.files[0]);
        setImage(url);
    }

    const addRoom = e => {
        e.preventDefault()
        let setting;
        if (inputs.setting === "public") {
            setting = false;
        } else {
            setting = true;
        }
        const data = {
            name: inputs.name,
            max_users: inputs.count,
            is_private: setting,
            thumbnail: image
        }
        console.log(data)
        // axios.post('api/rooms', inputs)
        //     .then((result) => {
        //         console.log(result.data)
        //     })
        //     .catch(err => {
        //         console.log(err.response)
        //     })
    }
    // TODO: once user creates room, redirect them to newly created room **
    return (
        <div className="RoomForm" >
            <Grid container direction="column" sx={gridStyle}>
                <Typography
                    id="form-title"
                    variant="h6"
                    components="h2"
                >
                    Create a Room
                </Typography>
                <TextField
                    label="Room name"
                    variant="outlined"
                    name="name"
                    value={inputs.name}
                    onChange={handleInputChange}
                    size="small"
                />
                <TextField
                    label="# of members"
                    variant="outlined"
                    name="count"
                    value={inputs.count}
                    onChange={handleInputChange}
                    size="small"
                />
                <Typography
                id="toggle-button-form"
                variant="h8"
                components="h6"
                >
                    Room Setting
                </Typography>
                <ToggleButtonGroup
                    exclusive
                    onChange={handleInputChange}
                    value={inputs.setting}>
                    <ToggleButton
                        label="Public"
                        name="setting"
                        value="public"
                    >
                        Public
                    </ToggleButton>
                    <ToggleButton
                        label="Private"
                        name="setting"
                        value="private"
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
                        size="small"
                        component="span"
                    >
                        Add Thumbnail
                    </Button>
                        <br></br>
                </label>
                { image ? <div>
                    <img src={image} alt='' style={imageStyle} />
                </div> : <div></div> }
                    <br></br>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={e => addRoom(e)}
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
    gap: 1,
    padding: "10px",
    alignItems: "center"
}

const imageStyle = {
    margin: "5px",
    width: "100px",
    height: "100px"
}