import React from 'react';

const individualEventOrGoalSx = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '12px',
}

let SingleEventOrGoal = (props) => {
  const date1 = new Date(props.content.event_date).toLocaleDateString('en-US')
  const date2 = new Date(props.content.event_date).toString().slice(0,15)

  return (
    <div style={individualEventOrGoalSx}>
      <span>{props.content.name}</span>
      <span>{props.content.event_date ? date2 : ''}</span>
      {/* {props.content.time ? <span>{props.content.time}</span> : null}
      {props.content.date ? <span>{props.content.date}</span> : null} */}
    </div>
  )
}

export default SingleEventOrGoal;