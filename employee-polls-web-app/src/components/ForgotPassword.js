import { Button, Typography } from '@mui/material';
import React from 'react';
import { BUTTON_TEXT_SIGN_UP, COMMING_SOON } from '../utils/GenericConstants';
import { SignUpUrl } from '../utils/PathUrlConstants';
  
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
        {COMMING_SOON}
        </Typography>
        <Typography variant="h6" color="text.primary" align="center">
          Please <Button variant="contained" color='primary' href={SignUpUrl}>{BUTTON_TEXT_SIGN_UP}</Button> to continue.
        </Typography>
      </div>
    </div>
  );
};
  
export default ForgotPassword;