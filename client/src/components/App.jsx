import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Home from './homepage/Home.jsx';
import TopicsPage from './topics/TopicsPage.jsx';
import Chatroom from './chatroom/Chatroom.jsx';

let App = () => {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/topics" element={<TopicsPage />}/>
        <Route path="/chatroom" element={<Chatroom />}/>
      </Routes>
    </>
  )
}

export default App;