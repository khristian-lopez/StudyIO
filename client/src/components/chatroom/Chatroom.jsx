import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

import Navbar from '../navbar/Navbar.jsx';
import RoomName from './RoomName.jsx';
import EventsList from './EventsList.jsx';
import StudyDocs from './userFiles/StudyDocs.jsx';

import "./Chatroom.scss";

const connection_port = 'localhost:3000/'

const Chatroom = ({user, setUser}) => {

  const [room, setRoom] = useState(null);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const socket = useRef(null);

  useEffect(() => {
    socket.current = io(connection_port)
    socket.current.on('message_update', (data) => {
      console.log('Updating List');
      setMessageList(prevList => [...prevList, data]);
    })

    const roomId = new URLSearchParams(window.location.search).get('room');
    setRoom(roomId);

    return () => {
      socket.current.close();
    }
  }, [])

  useEffect(() => {
    if (!room) { return }

    console.log('Changing to room: ' + room);
    socket.current.emit('join_room', room)
  }, [room])

  const handleSendMessage = (e) => {
    let messageObject = {
      room: room,
      message: {
        author: user,
        body: message
      }
    };

    socket.current.emit('new_message', messageObject);
    setMessageList([...messageList, messageObject.message]);
    setMessage('');
  }

  return (
    <div id='chatRoom'>
      <Navbar user={user} setUser={setUser}/>

      <div id='chatApp'>
        <div id='chatLeftBar'>
          <RoomName />
          <button>Join Video Chat</button>
          <EventsList />
          <div>Goals</div>
          <div>Motivational Quotes and Memes</div>
        </div>

        <div id='chatRight'>
          <div id='upperChatRight'>
            <div id='messages'>
              {messageList.map((value, key) => { return <p>{value.author} {value.body}</p> })}
            </div>

            <div id='userColum'>
              <div>Members</div>
              <StudyDocs room={room} />
            </div>
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