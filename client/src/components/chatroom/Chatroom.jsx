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
  width: '300px',
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
  // minHeight: '80vh'
  overflow: 'hidden'
}

const titleDivSx = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '24px',
  minHeight: '60px',
  // alignItems: 'center',
}

const titleSx = {
  fontWeight: 500,
  fontSize: '30px',
}

const messagesListSx = {
  display: 'flex',
  flexDirection: 'column',
}

let Chatroom = (props) => {

  //Before Login
  const [room, setRoom] = useState(new URLSearchParams(window.location.search).get('room'));

  //After Login
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const messageListComponent = useRef();

  const socket = useRef(null);

  useEffect(() => {
    socket.current = io.connect('/')
    socket.current.on('message_update', (data) => {
      console.log('Updating List');
      setMessageList(prevList => [...prevList, data]);
    })


    // Gets initial messages already in DB
    axios.get(`/api/chatroom/messages`, { params: { room_id: room } })
      .then(results => setMessageList(results.data))
      .catch(err => console.log(err))

    return () => {
      socket.current.close();
    }

  }, [])

  useEffect(() => {
    if (!room) { return }
    console.log('Changing to room: ' + room);
    socket.current.emit('join_room', room)
  }, [room])

  useEffect(() => {
    messageListComponent.current.scrollTop = messageListComponent.current.scrollHeight;
  }, [messageList])

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message === '') return;
    let messageObject = {
      room: room,
      message: {
        user_id: 1,
        body: message
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
      setLogin={props.setLogin} />

      <Drawer
        anchor={'left'}
        variant="permanent"
        sx={{ maxHeight: '100vh', '& .MuiDrawer-paper': { boxSizing: 'border-box', width: leftDrawerWidth }, }}
      >
        <LeftDrawer room={room} />
      </Drawer>

      <Drawer
        anchor={'right'}
        variant="permanent"
        sx={{ maxHeight: '100vh', '& .MuiDrawer-paper': { boxSizing: 'border-box', width: rightDrawerWidth }, }}
      >
        <RightDrawer room={room} />
      </Drawer>

      <div
        // Center block
        style={centerBlockSx}
      >
        {/* Messages block */}
        <div style={messagesBlockSx}>
          <div style={titleDivSx}>
            <span style={titleSx}>{new URLSearchParams(window.location.search).get('name')}</span>
            <button>Join Video Chat</button>
          </div>

          <div style={messagesListSx} ref={messageListComponent}>
            {messageList.length !== 0 ? messageList.map((message, i) =>
              <SingleMessage message={message} key={i}/>) : null}
          </div>

        </div>
        {/* input for messages */}
        <div style={inputMessagesSx}>
          <Divider />
          <form onSubmit={handleSendMessage}>
            <input
              style={inputSx}
              className="inputBox"
              type='text' placeholder='Message...'
              value={message}
              onChange={e => setMessage(e.target.value)}>
            </input>
            <button>Send</button>
          </form>
        </div>

      </div>
    </Box>
  )
}

export default Chatroom;