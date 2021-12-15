import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import "./Videochat.scss";

const Videochat = (props) => {

  const socketRef = useRef();
  const myVideoRef = useRef();
  const videoRefs = useRef({});

  const [peerList, setPeerList] = useState({});
  const peerListRef = useRef();

  //make reference to current peerList for connection confermation callback
  peerListRef.current = peerList;

  useEffect(() => {
    socketRef.current = io.connect('/');

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(myStream => {
        socketRef.current.emit('join_room', 10);

        //Get List of connected users and create a new peer to start sending them media each
        socketRef.current.on('connected_users', userList => {
          userList.forEach(user => {
            console.log('Connected User: ' + user);
            let createdPeer = new Peer({ initiator: true, trickle: false, stream: myStream })
            setPeerList(prevList => {
              let newObject = { ...prevList };
              newObject[user] = createdPeer
              return newObject
            });

            createdPeer.on('signal', data => {
              console.log('Sending Initial Connection Request to: ' + user)
              socketRef.current.emit('send_connection_to', { targetID: user, fromID: socketRef.current.id, fromSignal: data })
            })
          })
        })

        //A new user is sending a new connection to view
        socketRef.current.on('new_connection_request', ({ fromID, fromSignal }) => {
          console.log('New User trying to establish connection');
          let createdPeer = new Peer({ initiator: false, trickle: false, stream: myStream })
          setPeerList(prevList => {
            let newObject = { ...prevList };
            newObject[fromID] = createdPeer
            return newObject
          });
          createdPeer.on('signal', data => {
            socketRef.current.emit('confirmed_connection_request', { targetID: fromID, fromID: socketRef.current.id, fromSignal: data })
            console.log('Sending connection request confermation');
          })

          createdPeer.on('stream', stream => {
            console.log('Adding Stream');

            console.log('Video Refs:');
            console.log(videoRefs.current);

            console.log('id: ' + fromID)

            videoRefs.current[fromID].srcObject = stream;
          })

          createdPeer.signal(fromSignal);
        })

        //Connection has been confirmed, update peer's sending signal to remote target
        socketRef.current.on('connection_confirmation', ({ targetID, targetSignal }) => {
          console.log('Recieaving confermation request')
          console.log(targetID);
          console.log(peerListRef.current)
          peerListRef.current[targetID].signal(targetSignal);

          peerListRef.current[targetID].on('stream', stream => {
            console.log('Adding Confermation Stream');

            videoRefs.current[targetID].srcObject = stream;
          })
        })

        //Apply my video stream to my video container
        myVideoRef.current.srcObject = myStream;
      })
  }, []);

  function columnNumber(count) {
    console.log('columnNumber', count)
    if (count === 1) {
      return '100%';
    }

    if (count >= 2 && count <= 4) {
      return '50%';
    }

    return `${100/3}%`;
  }

  const videoStyle = {
    boxSizing: 'border-box',
    flexBasis: columnNumber(1 + Object.keys(peerList).length),
    backgroundColor: 'black'
  }

  return (
    <div>
      <div id='videoContainer'>
        <video playsInline ref={myVideoRef} muted autoPlay style={videoStyle} />
        {Object.keys(peerList).map(peerKey => <video playsInline ref={ref => { videoRefs.current[peerKey] = ref }} muted autoPlay style={videoStyle} />)}
      </div>
    </div>
  );
}

export default Videochat;