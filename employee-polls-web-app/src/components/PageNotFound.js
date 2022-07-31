import { Button, Typography } from '@mui/material';
import React from 'react';
import { BUTTON_TEXT_SIGN_IN, HOME } from '../utils/GenericConstants';
import {SignInUrl, RootPathUrl} from '../utils/PathUrlConstants';
import { connect } from 'react-redux';
import { useLocation, useNavigate} from "react-router-dom";



const PageNotFound = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (event, urlToRedirect) => {
    navigate(urlToRedirect+'?redirectTo='+location.pathname);
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
          {props.userLoggedIn 
          ? 
          <Button variant="contained" color='primary' align="center"  onClick={(e) => handleClick(e, RootPathUrl)}>
            {HOME}
          </Button>
          : 
          <Button variant="contained" color='primary' align="center" onClick={(e) => handleClick(e, SignInUrl)}>
                    {BUTTON_TEXT_SIGN_IN}
          </Button>
          }
        </Typography>
      </div>
    </div>
  );
};
  
function mapStateToProps({ authedUser }) {
  return {
    authedUser,
    userLoggedIn: authedUser !== null
  };
}

export default connect(mapStateToProps)(PageNotFound);