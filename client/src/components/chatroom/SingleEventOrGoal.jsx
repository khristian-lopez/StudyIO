import React from 'react';

const individualEventOrGoalSx = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '12px',
}

let SingleEventOrGoal = (props) => {

  return (
    <div style={individualEventOrGoalSx}>
      <span>{props.content.name}</span>
      <span>{props.content.event_date}</span>
      {/* {props.content.time ? <span>{props.content.time}</span> : null}
      {props.content.date ? <span>{props.content.date}</span> : null} */}
    </div>
  )
}

export default SingleEventOrGoal;