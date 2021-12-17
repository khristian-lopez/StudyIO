import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

const clientId =
  '321257595853-ompbh8dj5e9dg3rgo147ub5hkffsf3pt.apps.googleusercontent.com';

function Logout(props) {
  const navigate = useNavigate();
  const onSuccess = () => {
    props.setUserName('');
    props.setUserId('');
    props.setLogin(false);
    if(props.roomId) {
      // remove user from room
    }
    navigate('/topics');
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        render={renderProps => (
          <button style={props.style} onClick={renderProps.onClick} disabled={renderProps.disabled}>Log out</button>
        )}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;
