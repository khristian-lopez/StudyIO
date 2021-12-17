import React, { useState, useEffect } from 'react';
import axios from 'axios';

let SingleDoc = (props) => {

  return (
    <div style={docStyle}>
      <a href={props.url} target="_blank" style={docStyle}>{props.name}</a>
    </div>
  )
}

export default SingleDoc;

const docStyle = {
  textDecoration:'none',
  margin: "5px",
  maxWidth: '180px',
  height: '15px',
  color: '#f48c06',
  fontSize: '15px',
  oveflow: 'hidden'
}