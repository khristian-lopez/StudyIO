import React, {useState} from 'react';
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
    
    const addRoom = e => {
        e.preventDefault();

        let setting;
        if (inputs.setting === "public") {
            setting = false;
        } else {
            setting = true;
        }
        
        setNameError(false);
        setCountError(false);
        if (inputs.name === "") {
            setNameError(true)
        }
        if (inputs.count === "" || inputs.count.match(/^[0-9]*$/) === null ) {
            setCountError(true)
        }
        
        let count = Number(inputs.count)
        const data = {
            name: inputs.name,
            max_users: count,
            is_private: setting,
            thumbnail: image
        }
        if (nameError === false && countError === false) {
            console.log(data)
        }
        
        // axios.post('/', inputs)
        //     .then((result) => {
        //         console.log(result.data)
        //     })
        //     .catch(err => {
        //         console.log(err.response)
        //     })
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
                    helperText={nameError && "Cannot leave blank!"}
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
                    helperText={countError && "Cannot leave blank!"}
                />
                <Typography 
                id="toggle-button-form"
                variant="h8"
                components="h6"
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
                        color="info"
                    >
                        Public
                    </ToggleButton>
                    <ToggleButton 
                        label="Private" 
                        name="setting" 
                        value="private"
                        color="info" 
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
                    <Avatar src={image} style={imageStyle} alt=''/>
                </div> : <div></div> }
                    <br></br>
                <Button
                    type="submit"
                    variant="outlined"
                    size="small"
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
    xs: 12,
    gap: 2,
    margin: "10px",
    padding: "10px",
    width: 400,
    alignItems: "center"
}

const imageStyle = {
    width: "120px",
    height: "120px",
    margin: "5px",
    borderRadius: "50%"
}

const inputStyle = {
    width: "250px"
}