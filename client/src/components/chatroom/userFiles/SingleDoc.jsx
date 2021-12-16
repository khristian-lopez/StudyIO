import React, { useState, useEffect } from 'react';
import axios from 'axios';

let SingleDoc = (props) => {

  return (
    <div style={docStyle}>
      <a href={props.url} target="_blank">{props.name}</a>
    </div>
  )
}

export default SingleDoc;

const docStyle = {
  margin: "5px"
}