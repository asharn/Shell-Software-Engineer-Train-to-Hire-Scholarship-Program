import { Button, Typography } from '@mui/material';
import React from 'react';
  
const PageNotFound = () => {
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
      <Typography variant="h1" color="text.primary" align="center">
        <strong>404</strong>
      </Typography>
      <Typography variant="h3" color="text.primary" align="center">
        UH OH! You're lost.
      </Typography>
      <Typography variant="h6" color="text.primary" align="center">
        The page you are looking for does not exist.
          How you got here is a mystery. But you can click the button below
          to Sign In.
        </Typography>
        <Typography variant="h3" color="text.primary" align="center">
        <Button variant="contained" color='primary' align="center" href='/sign-in'>Sign In</Button>
        </Typography>
      </div>
    </div>
  );
};
  
export default PageNotFound;