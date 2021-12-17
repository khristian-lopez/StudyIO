import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { storage } from './index.js';
import Button from '@mui/material/Button';
import FileUploadIcon from '@mui/icons-material/FileUpload';

let Upload = (props) => {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleSwitch = (e) => {
    setUploading(true)
  }

  const formHandler = (e) => {
    console.log('file has been sent');
    const file = e.target[0].files[0]
    console.log(file)
    uploadFile(file)
    e.preventDefault();
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
            axios.post('/api/files/', {room: props.room, name: file.name, url: url}).then(results => console.log(results))
            props.update({name: file.name, url: url})
            setUploading(false)
            setProgress(0)
          })
      }
    );
  }

  return (
    <>
      {uploading === false ?
        <Button
        variant="outlined"
        onClick={handleSwitch}
        sx={buttonStyle}
        >
          Upload
          <FileUploadIcon sx={{ marginLeft: "3px" }}/>
        </Button>
        :
        <div>
          <form onSubmit={formHandler}>
            <input type="file" className="input" />
            <Button variant="outlined" type="submit"
            sx={buttonStyle2}
            >
              Upload
            </Button>
          </form>
          {progress !== 0 ? <h4>Uploaded {progress} %</h4> : null}
        </div>
      }
    </>
  )
}

export default Upload;

const buttonStyle = {
  border: '1px solid #f48c06',
  backgroundColor: '#f48c06',
  color: 'white',
  borderRadius:'15px'
}

const buttonStyle2 = {
  border: '1px solid #f48c06',
  backgroundColor: '#f48c06',
  color: 'white',
  borderRadius:'15px',
  width: '50px',
  height: '30px'
}