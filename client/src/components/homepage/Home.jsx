import React, {useState}from 'react';
import { Routes, Route, Link } from "react-router-dom";
import TopicsPage from '../topics/TopicsPage.jsx';
import Chatroom from '../chatroom/Chatroom.jsx';
import Topbar from './topbar/Topbar';
import Menu from './menu/Menu';
import "./home.scss"
import NavBar from '../navbar/Navbar'
import Slide from './slide/Slide';


const Home = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (

    <div className="homepage" id="homepage">
      {/* <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/> */}
      <NavBar
        userId={props.userId}
        setUserId={props.setUserId}
        userName={props.userName}
        setUserName={props.setUserName}
        login={props.login}
        setLogin={props.setLogin}/>
      {/* <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/> */}
      <div className="container">
        <div className="left">

          <div className="wrapper">
            <h2>Our Mission</h2>
            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</h3>

            <button>
              <nav>
                <Link to="/topics" style={{ textDecoration: 'none', color:'white' }}>
                  GET STARTED
                </Link>
              </nav>
            </button>

              {/* <nav>
                <Link to="/chatroom">Chat Room</Link>
              </nav>

              <nav>
                <Link to='/videochat'>Video Chat</Link>
              </nav> */}
          </div>
        </div>
        <div className="right">
          {/* <div className="imgContainer"> */}
            <Slide/>
            {/* <img src="assets/001.jpg" alt=""></img> */}
          {/* </div> */}
        </div>

      </div>


    </div>
  )
}

export default Home;