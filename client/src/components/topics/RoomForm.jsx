import React, {useState} from 'react';
import {Box, Button, TextField, ToggleButton, ToggleButtonGroup, styled} from '@mui/material';
import axios from 'axios';

const RoomForm = () => {
    const [inputs, setInputs] = useState({ name: "", count: "", setting: "" });

    const handleInputChange = e => {
        const {name, value} = e.target;
        setInputs(inputs => ({...inputs, [name]: value}))
    }

    const addRoom = e => {
        e.preventDefault()
        // TODO: data for file upload
        axios.post('/', inputs)
            .then((result) => {
                console.log(result.data)
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    console.log(inputs)
    return (
        <div className="RoomForm" >
            <Box component="form" autoComplete="off" sx={{'& > :not(style)': { m: 1, width: '25ch' },}}>
                <TextField 
                    label="Room name" 
                    variant="standard" 
                    name="name" 
                    value={inputs.name} 
                    onChange={handleInputChange}
                />
                    <br></br>
                <TextField 
                    label="Max member count" 
                    variant="standard" 
                    name="count" 
                    value={inputs.count} 
                    onChange={handleInputChange}
                />
                    <br></br>
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
                    <br></br>
                <label htmlFor="contained-button-file" >
                    <Input
                        id="contained-button-file"
                        type="file" 
                        accept="image/*" 
                        multiple 
                        label="Upload" 
                    />
                    <Button
                        variant="contained"
                        component="span"
                    >
                        Upload
                    </Button>
                </label>
                    <br></br>
                <Button
                    onClick={e => addRoom(e)}
                >
                    Create Room
                </Button>
            </Box>
        </div>
    )
}

export default RoomForm;

const Input = styled('input')({
    display: 'none'
})