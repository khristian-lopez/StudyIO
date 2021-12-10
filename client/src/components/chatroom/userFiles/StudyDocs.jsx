import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Upload from '../../firebase/Upload.jsx';
import SingleDoc from './SingleDoc.jsx';

let StudyDocs = (props) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    axios.get('/api/files/').then(results => {
      setDocs(results.data)
    })
  }, [])

  const handleUpload = (file) => {
    setDocs([...docs, file])
  }

  return (
    <>
      <div>Study Materials</div>

      <div>
        {docs ? docs.map((doc, i) => <SingleDoc key={i} name={doc.name} url={doc.url} />) : null}
      </div>

      <Upload room={props.room} update={handleUpload}/>
    </>
  )
}

export default StudyDocs;