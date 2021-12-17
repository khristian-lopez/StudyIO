import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Upload from '../../firebase/Upload.jsx';
import SingleDoc from './SingleDoc.jsx';

const titleSx = {
  fontSize: '20px',
  // marginBlockStart: '1em',
  // marginBlockEnd: '1em',
  textAlign: "center",
  fontWeight: 'bold',
  marginTop: "5px",
  marginBottom: '16px',
  color: 'white'
}

let StudyDocs = (props) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    console.log(props);
    axios.get(`/api/files/${props.room}`)
      .then(results => {
        console.log('Get data');
        console.log(results.data);
        setDocs(results.data)
      })
      .catch(err => console.log(err))
  }, [])

  const handleUpload = (file) => {
    axios.post('/api/files', { room_id: props.room, info: { url: file.url, name: file.name, user_id: props.user } })
      .then(results => console.log(results))
      .catch(err => console.log(err))
    setDocs([...docs, file])
  }

  return (
    <div style={containerStyle}>
      <div style={titleSx}>Study Materials</div>
      <div style={grid}>
        {docs ? docs.map((doc, i) => <SingleDoc key={i} name={doc.name} url={doc.url} />) : null}
      </div>
      <div style={buttonWrapper}>
        <Upload room={props.room} update={handleUpload} />
      </div>
    </div>
  )
}

export default StudyDocs;

const grid = {
  border: "1px solid #f48c06",
  height: "300px",
  overflowY: "scroll",
  marginBottom: "3mm",
  borderRadius: '15px',
  backgroundColor:'white'
}

const containerStyle = {
  backgroundColor: '#fcbf49',
  borderRadius: '15px',
}

const buttonWrapper = {
  display: "flex",
  justifyContent: "flex-start",
  margin:'5px'
}
