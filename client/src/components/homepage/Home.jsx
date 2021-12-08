import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import TopicsPage from '../topics/TopicsPage.jsx';
import Chatroom from '../chatroom/Chatroom.jsx';
import "./home.scss"

let Home = (props) => {

  return (
    <div className="homepage" id="homepage">
      <nav>
        <Link to="/topics">Topics Page</Link>
      </nav>
      <div className="test">
      </div>
      <nav>
        <Link to="/chatroom">Chatroom Page</Link>
      </nav>
    </div>
  )
}

export default Home;