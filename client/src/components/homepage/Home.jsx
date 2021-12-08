import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import TopicsPage from '../topics/TopicsPage.jsx';
import Chatroom from '../chatroom/Chatroom.jsx';

let Home = (props) => {

  return (
    <div>
      <nav>
        <Link to="/topics">Topics Page</Link>
      </nav>
      <nav>
        <Link to="/chatroom">Chatroom Page</Link>
      </nav>
    </div>
  )
}

export default Home;