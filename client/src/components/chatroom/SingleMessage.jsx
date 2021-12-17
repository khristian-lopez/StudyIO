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
