import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Upload from '../../firebase/Upload.jsx';
import SingleDoc from './SingleDoc.jsx';

const docsMockData = [
  { id: 1, name: 'Exam 1 Study Guide', url: 'https://bit.ly/3oKHoH6' },
  { id: 2, name: 'lecture 4 notes', url: 'https://bit.ly/3ERo1BO' },
  { id: 3, name: 'cheatsheet', url: 'https://bit.ly/3rSNIhB' }
]

let StudyDocs = (props) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    // axios.get('/api/files/').then(results => {
    //   setDocs(results.data)
    // })
    setDocs(docsMockData)
  }, [])



  return (
    <>
      <div>Study Materials</div>

      <div>
        {docs ? docs.map((doc, i) => <SingleDoc key={i} name={doc.name} url={doc.url}/>) : null}
      </div>

      <Upload room={props.room} />
    </>
  )
}

export default StudyDocs;