import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Upload from '../../firebase/Upload.jsx';
import SingleDoc from './SingleDoc.jsx';

const titleSx = {
  fontSize: '1.17em',
  // marginBlockStart: '1em',
  // marginBlockEnd: '1em',
  fontWeight: 'bold',
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
    <>
      <div style={titleSx}>Study Materials</div>

      <div>
        {docs ? docs.map((doc, i) => <SingleDoc key={i} name={doc.name} url={doc.url} />) : null}
      </div>

      <Upload room={props.room} update={handleUpload}/>
    </>
  )
}

export default StudyDocs;