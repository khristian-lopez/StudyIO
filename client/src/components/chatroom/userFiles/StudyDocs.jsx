import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Upload from '../../firebase/Upload.jsx';
import SingleDoc from './SingleDoc.jsx';

const titleSx = {
  fontSize: '1.17em',
  // marginBlockStart: '1em',
  // marginBlockEnd: '1em',
  textAlign: "center",
  fontWeight: 'bold',
  marginTop: "5px",
  marginBottom: '16px',
}

let StudyDocs = (props) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    axios.get('/api/files/').then(results => {
      setDocs(results.data)
    })
  }, [])

  const handleUpload = (file) => {
    // needs api call here
    setDocs([...docs, file])
  }

  return (
    <div style={containerStyle}>
      <div style={titleSx}>Study Materials</div>
      <div style={grid}>
        {docs ? docs.map((doc, i) => <SingleDoc key={i} name={doc.name} url={doc.url} />) : null}
      </div>
      <div style={buttonStyle}>
        <Upload room={props.room} update={handleUpload} />
      </div>
    </div>
  )
}

export default StudyDocs;

const grid = {
  border: "1px solid #000",
  height: "300px",
  overflowY: "scroll",
  marginBottom: "3mm"
}

const containerStyle = {
  margin: "3px"
}

const buttonStyle = {
  display: "flex",
  justifyContent: "center"
}