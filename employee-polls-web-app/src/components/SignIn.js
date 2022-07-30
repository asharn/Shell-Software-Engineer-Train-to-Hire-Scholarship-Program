import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { setAuthedUser } from '../actions/authedUser';
import { connect } from 'react-redux';
import { IconButton, InputAdornment } from '@mui/material';
import { useNavigate, useLocation, useParams} from "react-router-dom";
import { ForgotPasswordUrl, RootPathUrl, SignUpUrl} from '../utils/PathUrlConstants';
import { BUTTON_TEXT_SIGN_IN,FORGOT_PASSWORD_WHAT,DONT_HAVE_AN_ACCOUNT } from '../utils/GenericConstants';


const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const theme = createTheme();

const SignIn = (props) => {
  const navigate = useNavigate();
  const search = useLocation().search;
  const [showPassword, setShowPassword] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [usernameValue, setUsernameValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const { users} = props;

  const handleUsernameChange = (e) => {
      setUsernameValue(e.target.value);
      setError(false);
  };

  const handlePasswordChange = (e) => {
      setPasswordValue(e.target.value);
      setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');
    
    if(username === ''){
      setSuccess(false);
      setError(true);
    }else if(password === ''){
      setSuccess(false);
      setError(true);
    }else{
      if(users[username] && users[username].password === password){
        new Promise((res, rej) => {
          setTimeout(() => res(), 500);
        }).then(() => {
          props.dispatch(setAuthedUser(username));
          setSuccess(true);
          setError(false);
          const redirectTo = new URLSearchParams(search).get('redirectTo');
          redirectTo && redirectTo!=='' ? navigate(redirectTo) : navigate(RootPathUrl);
        });
      }else{
        setSuccess(false);
        setError(true);
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
            Sign in
          </Typography>
          {success ?
              <Typography color='success' className={"Success"} data-testid="success-header">Login Successfully!</Typography>
            :
              <Typography color='error' className={"Error"} data-testid="error-header">&nbsp;{error && 'Username or Password is invalid.'}&nbsp;</Typography>
            }
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              data-testid="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={usernameValue}
              onChange={handleUsernameChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              value={passwordValue}
              onChange={handlePasswordChange}
              type={showPassword ? "text" : "password"}
              id="password"
              data-testid="password"
              autoComplete="current-password"
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              data-testid='sign-in'
            >
              {BUTTON_TEXT_SIGN_IN}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href={ForgotPasswordUrl+search} variant="body2">
                  {FORGOT_PASSWORD_WHAT}
                </Link>
              </Grid>
              <Grid item>
                <Link href={SignUpUrl+search} variant="body2">
                  {DONT_HAVE_AN_ACCOUNT}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

function mapStateToProps({ authedUser, users }, props) {
  return {
    authedUser,
    users
  };
}

export default withRouter(connect(mapStateToProps)(SignIn));