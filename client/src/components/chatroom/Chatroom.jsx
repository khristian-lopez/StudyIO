import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Navbar from '../navbar/Navbar.jsx';

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

      <form id='testing' onSubmit={handleSubmit}>
        <input type='text' placeholder='Room' onChange={(e) => { setRoom(e.target.value) }} value={room} />
        <input type='text' placeholder='Name' onChange={(e) => { setUserName(e.target.value) }} value={userName} />
        <input type='submit' />
      </form>

      <div id='chatLeftBar'>
        Room Title
        Events
        Goals
        Motivational Quotes and Memes
      </div>

      <div id='chatApp'>
        <div>
          <div id='messages'>
            {messageList.map((value, key) => { return <p>{value.author} {value.body}</p> })}
          </div>

          Members
        </div>
        <div id='messageInput'>
          <input type='text' placeholder='Message...' value={message} onChange={(e) => { setMessage(e.target.value) }} />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>

      <Navbar user={props.user} />
    </div>
  )
}

export default Chatroom;