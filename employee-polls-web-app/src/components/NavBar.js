import React from 'react';
import { connect } from "react-redux";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import PollRounded from '@mui/icons-material/PollRounded';
import {createTheme} from "@mui/material/styles";
import { Avatar } from '@mui/material';

const theme = createTheme({
  typography: {
    button: {
      textTransform: "none"
    }
  }
});

const NavButton = (props) => {
    return(
        <Button color='inherit' href={props.href} theme={theme} sx={{
            ':hover': {
              bgcolor: 'white', 
              color: 'black',
            },            
            width: '90px',
          }}>{props.text}</Button>
    )
}

const NavBar = (props) => {
    return(
        <div>
        <AppBar position="static">
            <Toolbar>
                <Stack direction='row' spacing={{ xs: 3, sm: 6, md: 9 }} justifyContent="center" alignItems="center" divider={<Divider orientation="vertical" flexItem />}>
                <Stack direction='row' justifyContent="center" alignItems="center">
                    <IconButton href="/" size='large' edge='start' color='inherit' aria-label='logo'>
                        <PollRounded/>
                    </IconButton>
                    <Typography variant="h6"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none'
                                }}>
                    Employee Polls
                    </Typography>
                </Stack>
                    <Stack direction='row' spacing={1}>
                        {props.userLoggedIn===true ? 
                        <Stack direction='row' spacing={2}>
                            <NavButton text={'Home'} href={'/'}/>
                            <NavButton text={'Dashboard'} href={'/dashboard'}/>
                            <NavButton text={'Leaderboard'} href={'/leaderboard'}/>
                            <NavButton text={'New'} href={'/add'}/>
                        </Stack>
                        : 
                            <NavButton text={'Home'} href={'/'}/>
                        }
                    </Stack>
                    {props.userLoggedIn===true? 
                        <Stack direction='row' spacing={2}>
                            <Stack direction='row' spacing={1} justifyContent="center" alignItems="center">
                                <Avatar variant='circular' sx={{ width: 24, height: 24 }} src={props.users[props.authedUser].avatarURL}/>
                                <Typography fontSize='14px'>{props.users[props.authedUser].name}</Typography>
                            </Stack>
                            <NavButton text={'SignOut'} href={'/sign-out'}/>
                        </Stack>
                    :
                        <Stack direction='row' spacing={2}>
                            <NavButton text={'SignIn'} href={'/sign-in'}/>
                            <NavButton text={'SignUp'} href={'/sign-up'}/>
                        </Stack>
                    }
                </Stack>
            </Toolbar>
        </AppBar>
        </div>
    )
}

const mapStateToProps = ({ authedUser, users }) => ({
    authedUser,
    userLoggedIn: authedUser !== null,
    users
  });

export default connect(mapStateToProps)(NavBar);