import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const EditGoal = (props) => {
    const [goal, setGoal] = useState(props.currentGoal)

    useEffect(() => {
        setGoal(props.currentGoal)
    }, [props])

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setGoal({ ...goal, [name]: value });
    }
    console.log('current goal: ', goal)
    return (
        <div>
            <h4>Edit Goal</h4>
            <Box>
                <TextField 
                    variant="standard"
                    name="name"
                    onChange={handleInputChange}
                    value={goal.name}
                />
                <Button
                    variant="contained"
                    size="small"
                    onClick={e => {
                        e.preventDefault()
                        props.updateGoal(goal.id, goal)
                    }}>
                        Save
                </Button>
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                        props.setEditGoal(false)
                    }}>
                        Cancel
                </Button>
            </Box>
        </div>
    )
}


export default EditGoal;