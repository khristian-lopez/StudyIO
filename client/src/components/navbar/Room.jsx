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
      <span style={roomSx}>{props.room.room}</span>
      <span><button style={buttonSx} onClick={handleDrawerButton}>{buttonMessage}</button></span>
    </div>
  )
}

export default Room;