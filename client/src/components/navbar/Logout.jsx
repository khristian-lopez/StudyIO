import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId =
  '321257595853-ompbh8dj5e9dg3rgo147ub5hkffsf3pt.apps.googleusercontent.com';

function Logout(props) {
  console.log('props logout', props.logout)
  const onSuccess = () => {
    console.log('Logout made successfully');
    alert('Logout made successfully ✌');
    props.setUser(null);
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
