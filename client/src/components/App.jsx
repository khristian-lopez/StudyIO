import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Home from './homepage/Home.jsx';
import TopicsPage from './topics/TopicsPage.jsx';
import Chatroom from './chatroom/Chatroom.jsx';
import Navbar from './navbar/Navbar.jsx';
import Upload from './firebase/Upload.jsx';
import Videochat from './videochat/Videochat.jsx';


let App = () => {
  const [userId, setUserId] = React.useState(
    localStorage.getItem('userId')
  );
  const [userName, setUserName] = React.useState(
    localStorage.getItem('userName')
  )
  const [login, setLogin] = React.useState(
    localStorage.getItem('login') === 'true'
  )
  console.log('userName', userName)
  console.log('userId', userId)
  console.log('login', login)

  React.useEffect(() => {
    localStorage.setItem('login', login);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userName', userName);
  }, [login]);

  //TEST FUNCTION REMOVE AT SOME POINT
  // useEffect(() => {
  //   setUser(Math.floor(Math.random() * 1000000000))
  // }, [])


  return (
    <>
      <Routes>
        <Route path="/" element={<Home
          userId={userId}
          setUserId={setUserId}
          userName={userName}
          setUserName={setUserName}
          login={login}
          setLogin={setLogin} />} />
        <Route path="/topics" element={<TopicsPage
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