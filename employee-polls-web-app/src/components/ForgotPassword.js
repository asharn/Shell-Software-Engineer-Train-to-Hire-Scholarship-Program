import { Button, Typography } from '@mui/material';
import React from 'react';
  
const ForgotPassword = () => {
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
      <Typography variant="h3" color="text.primary" align="center">
        Comming Soon...
        </Typography>
        <Typography variant="h6" color="text.primary" align="center">
          Please <Button variant="contained" color='primary' href='/sign-up'>Sign Up</Button> to continue.
        </Typography>
      </div>
    </div>
  );
};
  
export default ForgotPassword;