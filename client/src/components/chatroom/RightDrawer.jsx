import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudyDocs from './userFiles/StudyDocs.jsx';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';

const rightDrawerSx = {
  marginTop: '56px',
  padding: '12px',
}

const titleSx = {
  fontSize: '1.17em',
  // marginBlockStart: '1em',
  // marginBlockEnd: '1em',
  fontWeight: 'bold',
  marginBottom: '16px',
}

const RightDrawer = (props) => {
  const [members, setMembers] = useState([]);
  useEffect(() => {
    axios.get('/api/chatroom/members', { params: { room_id: props.room } })
      .then(results => setMembers(results.data))
      .catch(err => console.log(err));

  }, [])

  return (
    <div style={rightDrawerSx}>
      <div style={{ marginBottom: '24px' }}>
        <div style={titleSx}>
          <span>Members</span>
          <button>Invite</button>
        </div>
        {members.length !== 0 ? members.map((member,i) => <li key={i}>{member.first_name} {member.last_name}</li>) : null}
      </div>
      <Divider />
      <div>
        <StudyDocs room={props.room} />
      </div>
    </div>
  )
}

export default RightDrawer;