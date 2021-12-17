import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

import Navbar from '../navbar/Navbar.jsx';
import LeftDrawer from './LeftDrawer.jsx';
import RightDrawer from './RightDrawer.jsx';
import SingleMessage from './SingleMessage.jsx';
import StudyDocs from './userFiles/StudyDocs.jsx';

import "./Chatroom.scss";

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';

const connection_port = 'localhost:3000/'

const rightDrawerWidth = 240;
const leftDrawerWidth = 350;
const intFrameHeight = window.innerHeight;

const centerBlockSx = {
  marginTop: '56px',
  padding: '20px',
  width: `calc(100% - ${leftDrawerWidth + rightDrawerWidth}px)`,
  marginRight: `${rightDrawerWidth}px`,
  marginLeft: `${leftDrawerWidth}px`,
  display: 'flex',
  flexDirection: 'column',
}

const inputSx = {
  height: '32px',
  width: '500px',
  borderRadius: '6px',
  paddingLeft: '16px',
  color: '#333',
  border: '1px solid #888b8e',
}

const inputMessagesSx = {
  display: 'flex',
  alignItems: 'flex-end',
  position: 'fixed',
  bottom: '20px',
}

const messagesBlockSx = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: `${intFrameHeight - 130}px`,
  overflow: 'hidden'
}

const titleDivSx = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems:'center',
  marginBottom: '24px',
  minHeight: '60px',
  border: '2px solid #f48c06',
  borderRadius:'15px',
  paddingLeft: '10px',
  color: 'orange',
  fontWeight: '900'
}

const videoButton = {
  width: '150px',
  height: '50px',
  borderRadius:'15px',
  marginRight: '10px',
  backgroundColor: '#f48c06',
  border: '1px solid #f48c06',
  color: 'white',
  fontWeight: '600'
}

const titleSx = {
  fontWeight: 500,
  fontSize: '30px',
}

const messagesListSx = {
  display: 'flex',
  flexDirection: 'column',
}

const buttonStyle = {
  marginLeft: "10px",
  fontSize: "14px",
  width: '80px',
  overflow: "hidden",
  border: '1px solid #f48c06',
  backgroundColor: '#f48c06',
  color: 'white',
  borderRadius: '15px',
  cursor:'pointer'
}

let Chatroom = (props) => {

  //Before Login
  const [roomId, setRoomId] = useState(new URLSearchParams(window.location.search).get('room'));
  const [roomData, setRoomData] = useState({});

  //After Login
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const messageListComponent = useRef();

  const socket = useRef(null);

  useEffect(() => {
    socket.current = io.connect('/')
    socket.current.on('message_update', (data) => {
      setMessageList(prevList => [...prevList, data]);
    })

    // Gets initial messages already in DB
    axios.get(`/api/chatroom/messages`, { params: { room_id: roomId } })
      .then(results => setMessageList(results.data))
      .catch(err => console.log(err))

    // Get room info
    axios.get('/api/chatroom/room', { params: { room_id: roomId } })
      .then(results => {
        setRoomData(results.data)
      })
      .catch(err => console.log(err))

    return () => {
      socket.current.close();
    }

  }, [])

  useEffect(() => {
    if (!roomId) { return }
    socket.current.emit('join_room', roomId)
  }, [roomId])

  useEffect(() => {
    messageListComponent.current.scrollTop = messageListComponent.current.scrollHeight;
  }, [messageList])

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message === '') return;
    let messageObject = {
      room: roomId,
      message: {
        user_id: props.userId,
        body: message,
        first_name: props.userName.split(' ')[0],
        last_name: props.userName.split(' ')[1],
      }
    };

    socket.current.emit('new_message', messageObject);
    axios.post('/api/chatroom/messages', messageObject)
      .then(results => console.log(results))
      .catch(err => console.log(err))

    setMessageList([...messageList, messageObject.message]);
    setMessage('');
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar userId={props.userId}
        setUserId={props.setUserId}
        userName={props.userName}
        setUserName={props.setUserName}
        login={props.login}
        setLogin={props.setLogin}
        roomId={roomId}
      />
      <Drawer
        anchor={'left'}
        variant="permanent"
        sx={{ maxHeight: '100vh', '& .MuiDrawer-paper': { boxSizing: 'border-box', width: leftDrawerWidth }, }}
      >
        <LeftDrawer room={roomId} user={props.userId} />
      </Drawer>
      <Drawer
        anchor={'right'}
        variant="permanent"
        sx={{ maxHeight: '100vh', '& .MuiDrawer-paper': { boxSizing: 'border-box', width: rightDrawerWidth }, }}
      >
        {Object.keys(roomData).length ? <RightDrawer roomData={roomData} userId={props.userId} /> : null}
      </Drawer>
      <div
        // Center block
        style={centerBlockSx}
      >
        {/* Messages block */}
        <div style={messagesBlockSx}>
          <div style={titleDivSx}>
            {roomData.name ? <span style={titleSx}>{roomData.name}</span> : <span></span>}
            {/* <button>Join Video Chat</button> */}
          </div>
          <div style={messagesListSx} ref={messageListComponent}>
            {messageList.length !== 0 ? messageList.map((message, i) => <SingleMessage key={i} message={message} />) : null}
          </div>
        </div>
        {/* input for messages */}
        <div style={inputMessagesSx}>
          <Divider />
          <form onSubmit={handleSendMessage}>
            <input
              maxLength="500"
              style={inputSx}
              className="inputBox"
              type='text' placeholder='Message...'
              value={message}
              onChange={e => setMessage(e.target.value)}
            >
            </input>
            <button style={buttonStyle}>Send</button>
          </form>
        </div>
      </div>
    </Box>
  )
}

export default Chatroom;