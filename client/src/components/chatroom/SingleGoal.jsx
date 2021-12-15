import React from 'react';

const individualEventOrGoalSx = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '12px',
}

let SingleGoal = (props) => {

  return (
    <div style={individualEventOrGoalSx}>
      <span>{props.content.name}</span>
    </div>
  )
}

export default SingleGoal;