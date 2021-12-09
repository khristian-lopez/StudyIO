import React from 'react';
import Navbar from '../navbar/Navbar.jsx';

let TopicsPage = (props) => {

  return (
    <div>
      <Navbar user={props.user}/>
      Topics Page
    </div>
  )
}

export default TopicsPage;