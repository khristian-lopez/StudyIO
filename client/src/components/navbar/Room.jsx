import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";


let roomsRowSx = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '10px',
  alignItems: 'center'
}

let roomSx = {
  float: 'left',
  cursor: 'pointer',
}

let buttonSx = {
  float: 'right',
  border: '1px solid black',
  width: '84px',
  height: '36px',
  borderRadius: '4px',
  background: 'white',
  cursor: 'pointer',
}

let Room = (props) => {

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
      <span><button style={buttonSx} onClick={handleDrawerButton}>{buttonMessage}</button></span>
    </div>
  )
}

export default Room;