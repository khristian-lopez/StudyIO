import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";

let roomsRowSx = {
  display: 'flex',
  marginTop: '10px',
  justifyContent: 'space-between',
  marginBottom: '10px',
  alignItems: 'center',
  height: '36px',
  border: '1px solid #FAA307',
  borderRadius: '5px',
  backgroundColor: '#fcbf49',
  color: '#03045e'
}

let roomSx = {
  float: 'left',
  cursor: 'pointer',
  marginLeft: '5px',
}

let buttonSx = {
  alignItems: 'center',
  border: '1px solid',
  width: '90px',
  height: '36px',
  borderRadius: '4px',
  background: '#FAA307',
  color: 'white',
  cursor: 'pointer',
}

let Room = (props) => {
  const numUserId = Number(props.user)

  const handleRoomClick = (e) => {
    e.preventDefault;
    window.location.href = window.location.origin + `/chatroom?room=${props.room.id}`;
  }

  let buttonMessage = 'Archive';
  let handleDrawerButton = (e) => {
    props.archive(props.room)
  }

  if (!props.active) {
    buttonMessage = 'Reactivate'
    handleDrawerButton = (e) => {
      props.reactivate(props.room)
    }
  }
  return (
    <div style={roomsRowSx}>
      <span style={roomSx} onClick={handleRoomClick}>{props.room.name}</span>
      <span>{numUserId === props.room.admin_id ? <button style={buttonSx} onClick={handleDrawerButton}>{buttonMessage}</button> : null}</span>
    </div>
  )
}

export default Room;