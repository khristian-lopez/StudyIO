import React from 'react'

const messageSx = {
  marginBottom: '12px',
  border: '1px solid rgba(0,0,0, 0.12)',
  borderRadius: '15px',
  padding: '10px',
  minHeight: '40px',
  backgroundColor: '#f9c74f',
}

let SingleMessage = (props) => {
  return (
    <div style={messageSx}>
      <div style={{marginBottom:'5px'}}><b>{props.message.first_name} {props.message.last_name} :</b></div>
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
