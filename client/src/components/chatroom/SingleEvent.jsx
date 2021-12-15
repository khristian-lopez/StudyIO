import React from 'react';

const individualEventOrGoalSx = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '12px',
}

let SingleEvent = (props) => {

  // convert from military time here

  // const time = `${props.content.event_time.slice(0,5)} am`
  // if (props.content.event_time.slice(0,2) > 12) {
  //   let numVersion = Number(props.content.event_time.slice(0,2)) - 12
  //   time = `${toString(numVersion).concat(props.content.event_time.slice(2,5))} pm`
  // }

  const month = props.content.event_date.slice(5,7)
  const day = props.content.event_date.slice(8,10)
  const date = `${month}/${day}`

  return (
    <div style={individualEventOrGoalSx}>
      <span>{props.content.name} - </span>
      {/* <span>{time},</span> */}
      <span>{date}</span>
    </div>
  )
}

export default SingleEvent;

// example
// {
//   name: newEvent.title,
//   user_id: props.user,
//   room_id: props.room,
//   event_date: newEvent.date,
//   event_time: newEvent.time
// }