import React, { useState, useEffect } from 'react';
import StudyDocs from './userFiles/StudyDocs.jsx';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import axios from 'axios';
import { nanoid } from 'nanoid';

const rightDrawerSx = {
  marginTop: '70px',
  padding: '12px',
}

const titleSx = {
  fontSize: '1.17em',
  bottom: "0",
  fontWeight: 'bold',
  marginBottom: '16px'
}

const RightDrawer = (props) => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (!props.roomData.id) { return }
    axios.get('/api/chatroom/members', { params: { room_id: props.roomData.id } })
      .then(results => setMembers(results.data))
      .catch(err => console.log(err));

  }, [props.roomData])

  function handleInvite() {
    let currentURL = new URL(window.location);
    let roomId = currentURL.searchParams.get('room');

    let searchParams = `?room=${roomId}`;
    if (props.roomData.is_private && (props.userId == props.roomData.admin_id)) {
      let invite_key = nanoid();
      axios.put('/api/rooms/new-invite-key', { room_id: props.roomData.id, invite_key })
        .then(res => {
          searchParams += `&invite=${invite_key}`;
          navigator.clipboard.writeText(currentURL.host + currentURL.pathname + searchParams)
          // alert('Invite copied to clipboard');
        })
        .catch((err) => {console.log('Invite Key Error'); console.log(err)});
    } else {
      navigator.clipboard.writeText(currentURL.host + currentURL.pathname + searchParams)
      // alert('Invite copied to clipboard');
    }
  }

  return (
    <div style={rightDrawerSx}>
      <div style={{ marginBottom: '24px', marginLeft: '10px' }}>
        <div style={titleSx}>
          <span>Members</span>
          <Button sx={buttonStyle} size="small" variant="outlined" onClick={handleInvite}>Invite</Button>
        </div>
        {members.length !== 0 ? members.map(member =>
          <li key={member.first_name + member.last_name}>
            {member.first_name} {member.last_name}
          </li>) : null}
      </div>
      <Divider />
      <div style={studySection}>
        {console.log(props.roomData.id)}
        <StudyDocs room={props.roomData.id} user={props.userId}/>
      </div>
    </div>
  )
}

export default RightDrawer;

const buttonStyle = {
  marginLeft: "10px",
  fontSize: "14px",
  maxHeight: "28px",
  maxWidth: "20px",
  overflow: "hidden",
  border: '1px solid #f48c06',
  backgroundColor: '#f48c06',
  color: 'white'
}

const studySection = {
  borderRadius: '15px',
  border: "1px solid #f48c06",
}