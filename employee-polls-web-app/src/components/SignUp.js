import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Cancel from '@mui/icons-material/Cancel';

import { IconButton, InputAdornment } from '@mui/material';
import { connect } from 'react-redux';
import { useNavigate} from "react-router-dom";

import { handleSaveUser} from '../actions/users';
import { setAuthedUser } from '../actions/authedUser';
import { handleInitialData } from "../actions/shared";
import {generateRandomProfilePic} from "../utils/generateRandomProfilePic";

const theme = createTheme();

const SignUp = (props) => {
  const navigate = useNavigate();

  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [hideCancel, setHideCancel] = React.useState(false);
  const [showIconVisibilityOnInputBox, setShowIconVisibilityOnInputBox] = React.useState('hidden');


  const handleHideCancel  = (e) => {
    e.preventDefault();
    const username = e.target.value;
    if(username.length>=6){
      setShowIconVisibilityOnInputBox('visible');
      if(!props.userIds.includes(e.target.value)){
        setHideCancel(true);
      }else{
        setHideCancel(false);
      }
    }else{
      setHideCancel(false);
      setShowIconVisibilityOnInputBox('hidden');
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');
    const firstname = data.get('firstName');
    const lastname = data.get('lastName');
    if(firstname === ''){
      setSuccess(false);
      setError(true);
      setErrorMsg('First Name is empty.');
    }else if(lastname === ''){
      setSuccess(false);
      setError(true);
      setErrorMsg('Last Name is empty.');
    }else if(username === '' || hideCancel===false){
      setSuccess(false);
      setError(true);
      setErrorMsg('Username is invalid.');
    }else if(password === '' || password.length < 8){
      setSuccess(false);
      setError(true);
      setErrorMsg('Password is invalid.');
    }else{
      if(!props.users[username]){
        new Promise((res, rej) => {
          const avatarURL = generateRandomProfilePic(username);
          props.dispatch(handleSaveUser({
            firstname,
            lastname,
            username,
            password,
            avatarURL
          }));
          ;
          setTimeout(() => res(), 500);
        })
        .then(() => props.dispatch(handleInitialData()))
        .then(() => props.dispatch(setAuthedUser(username)))
        .then(() => {
          setSuccess(true);
          setError(false);
          navigate('/dashboard');
        });
      }else{
        setSuccess(false);
        setError(true);
        setErrorMsg('Username is invalid.');

      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {success &&
                <Typography color='success' className={"Success"} data-testid="success-header">SignUp Successfully!</Typography>
            }
            {error &&
                <Typography color='error' className={"Error"} data-testid="error-header">{errorMsg}</Typography>
            }
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  onChange={handleHideCancel}
                  inputProps={{ minLength: 6, maxLength: 20 }}
                  InputProps={{
                    endAdornment: (  
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle usename existance"
                          style={{
                            visibility: {showIconVisibilityOnInputBox}
                            }}
                        >
                          {hideCancel ? <CheckCircle color='success'/> : <Cancel color='error'/>}
                        </IconButton>
                      </InputAdornment>
                    )
                    
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  inputProps={{ minLength: 8 }}
                  InputProps={{
                    endAdornment: (  
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                    
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/sign-in" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

const mapStateToProps = ({  authedUser, users  }) => {
  const userIds = Object.keys(users);  
  const avatarURLs = Object.values(users)
  .map(user => (user.avatarURL)); 
  return {
      userIds,
      avatarURLs,
      authedUser,
      users
  };
};

export default connect(mapStateToProps)(SignUp);