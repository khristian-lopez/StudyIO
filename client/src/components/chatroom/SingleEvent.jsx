import React from 'react';

let SingleEvent = (props) => {
  const month = props.content.event_date.slice(5,7)
  const day = props.content.event_date.slice(8,10)
  const date = `${month}/${day}`
  return (
    <div>
      <span>{props.content.name} - </span>
      <span>{date}</span>
      {/* <span>{props.content.event_time}</span> */}
    </div>
  )
}

export default SingleEvent;
