import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { storage } from './index.js';

let Upload = (props) => {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleSwitch = (e) => {
    setUploading(true)
  }

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0]
    console.log(file)
    uploadFile(file)
  }

  const uploadFile = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/${props.room}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
      // always runs first and runs multiple times over function call
      const prog = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(prog)
    },
      // runs on error
      (err) => console.log(err),

      // run on completion
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(url => {
            console.log(url);
            // axios.post('/api/files/upload', {room: props.room, name: file.name, url: url}).then(results => console.log(results))
            setUploading(false)
          })
      }
    );
  }

  return (
    <>
      {uploading === false ?
        <button onClick={handleSwitch}>Upload</button>
        :
        <div>
          <form onSubmit={formHandler}>
            <input type="file" className="input" />
            <button>Upload</button>
          </form>
          {progress !== 0 ? <h3>Uploaded {progress} %</h3> : null}
        </div>
      }
    </>
  )
}

export default Upload;