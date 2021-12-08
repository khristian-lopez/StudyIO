import React, {useState}from 'react';
import { Routes, Route, Link } from "react-router-dom";
import TopicsPage from '../topics/TopicsPage.jsx';
import Chatroom from '../chatroom/Chatroom.jsx';
import Topbar from './topbar/Topbar';
import Menu from './menu/Menu';
import "./home.scss"

const Home = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="homepage" id="homepage">
      <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
      <div className="container">
        <div className="left">
          <div className="wrapper">
            <h2>Our Mission</h2>
            <h3>
             enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </h3>
            <h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </h3>
            <nav>
              <Link to="/topics">Topics Page</Link>
            </nav>
            <nav>
              <Link to="/chatroom">Chatroom Page</Link>
            </nav>
          </div>
        </div>
        <div className="right">
          <div className="imgContainer">
            <img src="assets/childCare.jpg" alt=""></img>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Home;