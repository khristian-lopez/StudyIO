import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import TopicsPage from '../topics/TopicsPage.jsx';
import Chatroom from '../chatroom/Chatroom.jsx';
import Topbar from './topbar/Topbar';
import "./home.scss"

let Home = (props) => {

  return (
    <div className="homepage" id="homepage">
      <Topbar/>
      <div className="irrelavant">
        <nav>
          <Link to="/topics">Topics Page</Link>
        </nav>
        <nav>
          <Link to="/chatroom">Chatroom Page</Link>
        </nav>
      </div>
    </div>
  )
}

export default Home;