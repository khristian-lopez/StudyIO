import React from 'react'

const messageSx = {
  marginBottom: '12px',
  border: '1px solid rgba(0,0,0, 0.12)',
  borderRadius: '6px',
  padding: '10px',
  minHeight: '40px'
}

let SingleMessage = (props) => {
  return (
    <div style={messageSx}>
      <div><b>{props.message.first_name} {props.message.last_name}</b></div>
      <p>{props.message.body}</p>
    </div>
  )
}

export default SingleMessage;

// Example
// {
//   "id": 1,
//   "room_id": 1,
//   "user_id": 1,
//   "body": "testing",
//   "created_at": "2021-12-13T20:50:31.314Z"
// }
