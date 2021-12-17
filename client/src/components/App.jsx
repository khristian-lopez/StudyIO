import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import TopicsPage from './topics/TopicsPage.jsx';
import Chatroom from './chatroom/Chatroom.jsx';
import Navbar from './navbar/Navbar.jsx';
import Upload from './firebase/Upload.jsx';
import Videochat from './videochat/Videochat.jsx';


let App = () => {
  const [userId, setUserId] = React.useState(() => {
      const saved = localStorage.getItem('userId');
      return saved || "";
    });
  const [userName, setUserName] = React.useState(() => {
      const saved = localStorage.getItem('userName');
      return saved || "";
    }
  )
  const [login, setLogin] = React.useState(() => {
      const saved = localStorage.getItem('login') === 'true';
      return saved || false
    }
  )

  React.useEffect(() => {
    localStorage.setItem('login', login);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userName', userName);
  }, [login]);

  return (
    <>
      <Routes>
        <Route path="/" element={<TopicsPage
          userId={userId}
          setUserId={setUserId}
          userName={userName}
          setUserName={setUserName}
          login={login}
          setLogin={setLogin}/>} />
        <Route path="/chatroom" element={<Chatroom
          userId={userId}
          setUserId={setUserId}
          userName={userName}
          setUserName={setUserName}
          login={login}
          setLogin={setLogin}/>} />
        <Route path="/file-share" element={<Upload />} />
        <Route path="/videochat" element={<Videochat/>} />
      </Routes>
    </>
  )
}

export default App;