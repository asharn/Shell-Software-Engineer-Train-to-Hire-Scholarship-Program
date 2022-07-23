import { Button } from '@mui/material';
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
        <h1>404</h1>
        <h2>UH OH! You're lost.</h2>
        <p>The page you are looking for does not exist.
          How you got here is a mystery. But you can click the button below
          to go back to the Sign In.
        </p>
        <Button variant="contained" color='primary' href='/sign-in'>Sign In</Button>
      </div>
    </div>
  );
};
  
export default PageNotFound;