import React from 'react';
import Navbar from '../navbar/Navbar.jsx';

let Chatroom = (props) => {

  return (
    <div>
      <Navbar user={props.user} />
      Chatroom page
    </div>
  )
}

export default Chatroom;