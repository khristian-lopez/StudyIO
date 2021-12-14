import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Home from './homepage/Home.jsx';
import TopicsPage from './topics/TopicsPage.jsx';
import Chatroom from './chatroom/Chatroom.jsx';
import Navbar from './navbar/Navbar.jsx';
import Upload from './firebase/Upload.jsx';
import Videochat from './videochat/Videochat.jsx';


let App = () => {
  const [user, setUser] = useState(null);
  console.log('user', user)

  useEffect(() => {
    setUser(Math.floor(Math.random() * 1000000000))
  }, [])


  return (
    <>
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser}/>} />
        <Route path="/topics" element={<TopicsPage user={user} setUser={setUser}/>} />
        <Route path="/chatroom" element={<Chatroom user={user} setUser={setUser}/>} />
        <Route path="/file-share" element={<Upload />} />
        <Route path="/videochat" element={<Videochat/>} />
      </Routes>
    </>
  )
}

export default App;