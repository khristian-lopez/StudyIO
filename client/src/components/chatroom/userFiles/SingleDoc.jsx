import React, { useState, useEffect } from 'react';
import axios from 'axios';

let SingleDoc = (props) => {

  return (
      <div>
        <a href={props.url} target="_blank">{props.name}</a>
      </div>
  )
}

export default SingleDoc;