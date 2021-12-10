import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import Navbar from '../navbar/Navbar.jsx';
import RoomName from './RoomName.jsx';
import EventsList from './EventsList.jsx';

import "./Chatroom.scss";

let socket;
const connection_port = 'localhost:3000/'

let Chatroom = (props) => {

  //Before Login
  const [room, setRoom] = useState('Javascript');
  const [userName, setUserName] = useState('');

  //After Login
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket = io(connection_port)
    socket.on('message_update', (data) => {
      console.log('Updating List');
      setMessageList(prevList => [...prevList, data]);
    })

    return () => {
      socket.close();
    }
  }, [])

  const connectToRoom = () => {
    socket.emit('join_room', room)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    connectToRoom();
  }

  const handleSendMessage = (e) => {
    let messageObject = {
      room: room,
      message: {
        author: userName,
        body: message
      }
    };

    socket.emit('new_message', messageObject);
    setMessageList([...messageList, messageObject.message]);
    setMessage('');
  }

  return (
    <div id='chatRoom'>
      <Navbar user={props.user} />

      {/* <form id='testing' onSubmit={handleSubmit}>
        <input type='text' placeholder='Room' onChange={(e) => { setRoom(e.target.value) }} value={room} />
        <input type='text' placeholder='Name' onChange={(e) => { setUserName(e.target.value) }} value={userName} />
        <input type='submit' />
      </form> */}

      <div id='chatApp'>
        <div id='chatLeftBar'>
          <RoomName/>
          <button>Join Video Chat</button>
          <EventsList/>
          <div>Goals</div>
          <div>Motivational Quotes and Memes</div>
        </div>

        <div id='chatRight'>
          <div id='upperChatRight'>
            <div id='messages'>
              {messageList.map((value, key) => { return <p>{value.author} {value.body}</p> })}
            </div>

            <div id='userColum'>Members</div>
          </div>
          <div id='messageInput'>
            <input type='text' placeholder='Message...' value={message} onChange={(e) => { setMessage(e.target.value) }} />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chatroom;