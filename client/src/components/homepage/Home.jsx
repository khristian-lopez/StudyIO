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
            Snap half of the universe away, LMAO
            </h3>

            <button>
              <nav>
                <Link to="/chatroom" style={{ textDecoration: 'none', color:'white' }}>
                  GET STARTED
                </Link>
              </nav>
            </button>
              <nav className="link">
                <Link to="/topics">Topics Page</Link>
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