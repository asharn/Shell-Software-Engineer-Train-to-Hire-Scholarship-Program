import { Button, Typography } from '@mui/material';
import React from 'react';
import { BUTTON_TEXT_SIGN_IN, YOU_ARE_NOT_AUTHORIZED } from '../utils/GenericConstants';
import {SignInUrl} from '../utils/PathUrlConstants';
import { useLocation, useNavigate} from "react-router-dom";
import {connect} from "react-redux";


  
const NotAuthorized = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    navigate(SignInUrl+'?redirectTo='+location.pathname);
};
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
        {YOU_ARE_NOT_AUTHORIZED}
        </Typography>
        <Typography variant="h6" color="text.primary" align="center">
          Please <Button variant="contained" color='primary' align="center" onClick={handleClick}>
                    {BUTTON_TEXT_SIGN_IN}
                  </Button> to continue.
        </Typography>
      </div>
    </div>
  );
};
  
const mapStateToProps = () => ({});

export default connect(mapStateToProps)(NotAuthorized);