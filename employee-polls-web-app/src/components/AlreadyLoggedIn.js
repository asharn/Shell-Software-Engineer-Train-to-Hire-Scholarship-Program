import React from 'react';
  
const AlreadyLoggedIn = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh'
      }}
    >
      <h1>You are already signed in. Please Sign Out to re Sign In.</h1>
    </div>
  );
};
  
export default AlreadyLoggedIn;