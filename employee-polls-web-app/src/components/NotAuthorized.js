import { Button } from '@mui/material';
import React from 'react';
  
const NotAuthorized = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh'
      }}
    >
      <div>
        <h1>You are not authorized to visit this page.</h1>
        <div>
          <h1>Please <Button variant="contained" color='primary' href='/sign-in'>Sign In</Button> to continue.</h1>
        </div>
      </div>
    </div>
  );
};
  
export default NotAuthorized;