import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';

const EditGoal = (props) => {
    const [goal, setGoal] = useState(props.currentGoal)

    useEffect(() => {
        setGoal(props.currentGoal)
    }, [props])

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setGoal({ ...goal, [name]: value });
    }

    const updateDatabaseGoal = (id, goal) => {
        let goal_id = id.toString()
        axios.put(`/api/chatroom/goals/${goal_id}/update`, { name: goal })
            .then(() => {
                console.log('success')
            })
            .catch(err => console.log(err))
    }
    
    return (
        <div>
            <h4>Edit Goal</h4>
            <Box sx={style}>
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
                        updateDatabaseGoal(goal.id, goal.name)
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

const style = {
    display: "flex",
    gap: "5px"
}