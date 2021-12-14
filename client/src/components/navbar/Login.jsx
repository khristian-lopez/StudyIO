import React from 'react';
import { GoogleLogin } from 'react-google-login';

const clientId =
  '321257595853-ompbh8dj5e9dg3rgo147ub5hkffsf3pt.apps.googleusercontent.com';

function Login(props) {
  const onSuccess = (res) => {
    // console.log('Login Success: currentUser:', res.profileObj);
    alert(
      `Logged in successful. Welcome ${res.profileObj.name}!`
    );
    props.setUserId(res.profileObj.googleId);
    props.setUserName(res.profileObj.name);
    props.setLogin(true);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login.`
    );
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;
